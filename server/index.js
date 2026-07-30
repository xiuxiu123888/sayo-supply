import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import Database from 'better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3010);
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'sayo123456';
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'sayo-admin-secret-change-me';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

const dbPath = path.join(__dirname, 'data.sqlite');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    contacted INTEGER NOT NULL DEFAULT 0,
    note TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );
`);

const existingCols = db.prepare(`PRAGMA table_info(contact_messages)`).all().map((c) => c.name);
if (!existingCols.includes('contacted')) {
  db.exec(`ALTER TABLE contact_messages ADD COLUMN contacted INTEGER NOT NULL DEFAULT 0`);
}
if (!existingCols.includes('note')) {
  db.exec(`ALTER TABLE contact_messages ADD COLUMN note TEXT NOT NULL DEFAULT ''`);
}
if (!existingCols.includes('email')) {
  db.exec(`ALTER TABLE contact_messages ADD COLUMN email TEXT NOT NULL DEFAULT ''`);
}

const insertMessage = db.prepare(`
  INSERT INTO contact_messages (name, phone, email, company, message)
  VALUES (@name, @phone, @email, @company, @message)
`);

const getMessage = db.prepare(`
  SELECT id, name, phone, email, company, message, contacted, note, created_at,
    CASE
      WHEN phone != '' AND email != '' AND phone != email THEN phone || ' / ' || email
      WHEN email != '' AND (phone = '' OR phone = email) THEN email
      ELSE phone
    END AS contact
  FROM contact_messages
  WHERE id = ?
`);

const updateMessage = db.prepare(`
  UPDATE contact_messages
  SET contacted = @contacted, note = @note
  WHERE id = @id
`);

function createToken() {
  const payload = Buffer.from(
    JSON.stringify({
      u: ADMIN_USER,
      exp: Date.now() + TOKEN_TTL_MS,
    }),
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('base64url');
  if (sig !== expected) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.u !== ADMIN_USER || typeof data.exp !== 'number' || data.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!verifyToken(token)) {
    return res.status(401).json({ ok: false, error: '未登录或登录已过期' });
  }
  next();
}

function isDateOnly(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function normalizePhone(value) {
  return String(value || '').replace(/[\s\-()]/g, '');
}

function isValidPhone(value) {
  const phone = normalizePhone(value);
  // 中国大陆手机号，或带 +86 / 0086 前缀
  if (/^(\+?86|0086)?1[3-9]\d{9}$/.test(phone)) return true;
  // 固话：区号+号码，如 01012345678 / 075512345678
  if (/^0\d{2,3}\d{7,8}$/.test(phone)) return true;
  return false;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', (req, res) => {
  const name = String(req.body?.name || '').trim();
  const contact = String(req.body?.contact || req.body?.phone || req.body?.email || '').trim();
  const company = String(req.body?.company || '').trim();
  const message = String(req.body?.message || '').trim();

  if (!name || !contact || !message) {
    return res.status(400).json({ ok: false, error: '请填写姓名、联系方式和需求描述' });
  }
  if (!isValidPhone(contact) && !isValidEmail(contact)) {
    return res.status(400).json({ ok: false, error: '请输入有效的手机号、固话或邮箱' });
  }
  if (name.length > 80 || contact.length > 120 || company.length > 120 || message.length > 2000) {
    return res.status(400).json({ ok: false, error: '字段长度超出限制' });
  }

  const phone = isValidPhone(contact) ? contact : '';
  const email = isValidEmail(contact) ? contact : '';
  // 统一写入 phone 便于兼容旧数据展示；邮箱也会写入 email
  const result = insertMessage.run({
    name,
    phone: phone || contact,
    email,
    company,
    message,
  });
  res.json({ ok: true, id: Number(result.lastInsertRowid) });
});

app.post('/api/admin/login', (req, res) => {
  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '');

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ ok: false, error: '用户名或密码错误' });
  }

  res.json({ ok: true, token: createToken() });
});

app.get('/api/admin/messages', requireAuth, (req, res) => {
  const from = String(req.query.from || '').trim();
  const to = String(req.query.to || '').trim();
  const contacted = String(req.query.contacted || '').trim();

  const where = [];
  const params = {};

  if (from) {
    if (!isDateOnly(from)) {
      return res.status(400).json({ ok: false, error: '开始日期格式应为 YYYY-MM-DD' });
    }
    where.push(`created_at >= @from`);
    params.from = `${from} 00:00:00`;
  }
  if (to) {
    if (!isDateOnly(to)) {
      return res.status(400).json({ ok: false, error: '结束日期格式应为 YYYY-MM-DD' });
    }
    where.push(`created_at <= @to`);
    params.to = `${to} 23:59:59`;
  }
  if (contacted === '0' || contacted === '1') {
    where.push(`contacted = @contacted`);
    params.contacted = Number(contacted);
  }

  const sql = `
    SELECT id, name, phone, email, company, message, contacted, note, created_at,
      CASE
        WHEN phone != '' AND email != '' AND phone != email THEN phone || ' / ' || email
        WHEN email != '' AND (phone = '' OR phone = email) THEN email
        ELSE phone
      END AS contact
    FROM contact_messages
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY id DESC
  `;
  const rows = db.prepare(sql).all(params);
  res.json({ ok: true, data: rows });
});

app.patch('/api/admin/messages/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ ok: false, error: '无效的留言 ID' });
  }

  const current = getMessage.get(id);
  if (!current) {
    return res.status(404).json({ ok: false, error: '留言不存在' });
  }

  let contacted = current.contacted;
  if (typeof req.body?.contacted !== 'undefined') {
    contacted = req.body.contacted ? 1 : 0;
  }

  let note = current.note;
  if (typeof req.body?.note !== 'undefined') {
    note = String(req.body.note || '').trim();
    if (note.length > 2000) {
      return res.status(400).json({ ok: false, error: '备注长度超出限制' });
    }
  }

  updateMessage.run({ id, contacted, note });
  const updated = getMessage.get(id);
  res.json({ ok: true, data: updated });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sayo API listening on http://0.0.0.0:${PORT}`);
  console.log(`SQLite: ${dbPath}`);
});
