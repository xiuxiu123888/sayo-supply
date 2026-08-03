/** PM2 生产进程配置（宝塔 / 服务器用） */
module.exports = {
  apps: [
    {
      name: 'sayo-api',
      script: 'server/index.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 3010,
        // 上线后务必修改以下三项
        ADMIN_USER: 'admin',
        ADMIN_PASS: 'sayo123456',
        ADMIN_TOKEN_SECRET: 'sayo-admin-secret-change-me',
      },
    },
  ],
};
