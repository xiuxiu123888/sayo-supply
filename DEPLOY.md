# 山岳供应链网站部署说明

本文档说明如何将本项目部署到 **阿里云 ECS + 宝塔面板**，以及日常如何更新前端。

## 项目结构

| 部分 | 说明 |
|------|------|
| 前端 | Vue 3 + Vite，构建产物在 `dist/` |
| 后端 | Express + SQLite（留言与后台），入口 `server/index.js` |
| 进程管理 | PM2（`ecosystem.config.cjs`） |
| Web 服务 | Nginx（宝塔），静态目录指向 `dist`，`/api` 反代到 Node |

推荐架构：

```text
浏览器 → Nginx(80/443) → 静态页面(dist)
                      └→ /api → Node(3010) → SQLite
```

---

## 一、服务器环境要求

- 系统：Ubuntu 22.04 / 24.04 / 26.04 LTS
- Node.js：**22+**（`better-sqlite3@13` 需要 Node ≥ 22；Node 20 可能 Segmentation fault）
- 宝塔面板（已装 Nginx）
- 编译依赖：`build-essential`、`python3`（编译 better-sqlite3）
- 安全组放行：`22`、`80`、`443`

安装 Node 22 示例：

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
node -v   # 应显示 v22.x.x

apt install -y build-essential python3 git
npm i -g pm2
```

---

## 二、首次部署

### 1. 拉取代码

```bash
mkdir -p /www/wwwroot
cd /www/wwwroot
git clone https://github.com/xiuxiu123888/sayo-supply.git sayo
cd sayo
```

> 仓库地址按实际为准。

### 2. 安装依赖并构建前端

```bash
npm install
npm run build
```

成功后应存在：`/www/wwwroot/sayo/dist/index.html`

### 3. 配置 PM2 环境变量

编辑（或创建）`ecosystem.config.cjs`：

```js
module.exports = {
  apps: [
    {
      name: 'sayo-api',
      script: 'server/index.js',
      cwd: '/www/wwwroot/sayo',
      instances: 1,
      exec_mode: 'fork',   // 必须用 fork，不要用 cluster（SQLite）
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 3010,
        ADMIN_USER: 'admin',
        ADMIN_PASS: '换成强密码',
        ADMIN_TOKEN_SECRET: '换成很长的随机字符串',
      },
    },
  ],
};
```

生成随机密钥示例：

```bash
openssl rand -hex 32
```

### 4. 启动后端

```bash
cd /www/wwwroot/sayo
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
# 按提示再执行它输出的那条 sudo 命令

# 验证
curl -I http://127.0.0.1:3010
pm2 status
```

`sayo-api` 应为 `online`。根路径可能返回 404（仅 API），属正常；有 `/api` 即可。

> **不要**把 `3010` 长期暴露到公网，只给本机 Nginx 反代。

### 5. 宝塔添加网站

1. 安装 **Nginx**（若尚未安装）
2. **网站** → 添加站点（可用「HTML 项目」）
3. 域名：填域名；没有域名可先填公网 IP
4. 根目录：`/www/wwwroot/sayo/dist`
5. 建议关闭「防跨站攻击（open_basedir）」，避免 `dist/.user.ini` 锁死导致无法 `npm run build`

### 6. Nginx 配置要点

在站点 **配置文件** 中确保有（保留宝塔原有 CERT / SSL 注释块即可）：

```nginx
# API 反代到 Node
location /api/ {
    proxy_pass http://127.0.0.1:3010;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Vue history 路由
location / {
    try_files $uri $uri/ /index.html;
}
```

保存并重载 Nginx。

### 7. 域名与 HTTPS

1. 阿里云解析添加 **A 记录**（不要改 MX 邮箱记录）：
   - 主机记录 `@` → 服务器公网 IP  
   - 主机记录 `www` → 同一公网 IP  
2. 宝塔站点 **域名管理** 添加：`你的域名`、`www.你的域名`
3. **SSL** → 申请 Let's Encrypt 免费证书 → 部署 → 开启强制 HTTPS
4. 安全组放行 **443**

纯公网 IP 一般无法申请免费 HTTPS，需绑定域名。

---

## 三、日常更新前端

本机改完代码并推送到 GitHub 后，在服务器执行：

```bash
cd /www/wwwroot/sayo
git pull
npm install          # 未改 package.json 可跳过
npm run build
```

纯前端变更 **通常不必** `pm2 restart`。浏览器强刷（Ctrl+F5）查看。

若改了 `server/` 或 `ecosystem.config.cjs`：

```bash
pm2 restart sayo-api
```

### git pull 与本地配置冲突

服务器上的 `ecosystem.config.cjs` 往往含生产密码，若与仓库冲突：

```bash
cp ecosystem.config.cjs /root/ecosystem.config.cjs.bak
rm -f ecosystem.config.cjs
git pull
cp /root/ecosystem.config.cjs.bak ecosystem.config.cjs
```

建议：不要把真实密码提交进 Git；服务器单独保留一份配置。

### 构建失败：`dist/.user.ini` Operation not permitted

宝塔给 `.user.ini` 加了不可变属性，Vite 清空 `dist` 会失败：

```bash
cd /www/wwwroot/sayo
chattr -i dist/.user.ini
rm -f dist/.user.ini
rm -rf dist/*
npm run build
```

并关闭站点「防跨站攻击」。

---

## 四、常用运维命令

```bash
pm2 status
pm2 logs sayo-api --lines 50
pm2 restart sayo-api
pm2 stop sayo-api

# 前台调试（先 pm2 stop）
cd /www/wwwroot/sayo
node server/index.js
```

后台地址：`https://你的域名/admin`  
账号密码见 `ecosystem.config.cjs` 中的 `ADMIN_USER` / `ADMIN_PASS`。

SQLite 数据文件：`server/data.sqlite`（请定期备份）。

---

## 五、验收清单

- [ ] `http(s)://域名` 首页正常  
- [ ] `/crexpres`、`/trucking`、`/contact` 刷新不 404  
- [ ] 联系表单可提交  
- [ ] `/admin` 可登录查看留言  
- [ ] `pm2 status` 中 `sayo-api` 为 online  
- [ ] HTTPS 证书有效（若已配置域名）

---

## 六、常见问题

| 现象 | 处理 |
|------|------|
| `Segmentation fault` 启动 Node | 升级到 Node 22，删 `node_modules` 后重新 `npm install` |
| `curl 127.0.0.1:3010` 连不上 | `pm2 logs`；确认 `exec_mode: 'fork'` |
| 首页通但留言失败 | 检查 `/api` 反代与 `pm2 status` |
| HTTPS 打不开 | 需域名 + SSL；安全组放行 443 |
| SSL 部署失败 ssl_ciphers duplicate | 配置文件去掉重复的 `ssl_protocols` / `ssl_ciphers` 后再部署 |
| 图片太大占带宽 | 大图已转 WebP（`hero-bg.webp` / `case-1.webp` / `ftl.webp`）；仍慢可上 OSS/CDN |

---

## 七、目录速查

```text
/www/wwwroot/sayo/
├── dist/                 # Nginx 网站根目录（构建产物）
├── server/
│   ├── index.js          # API
│   └── data.sqlite       # 留言数据库（勿误删）
├── ecosystem.config.cjs  # PM2 配置（含生产密码，勿随意覆盖）
├── package.json
└── src/                  # 前端源码
```

---

## 八、最短记忆

```text
首次：clone → npm i → npm run build → 配 ecosystem → pm2 start → Nginx(dist + /api)
更新前端：git pull → npm run build → 强刷浏览器
改后端：git pull → pm2 restart sayo-api
```
