# 罗玉莹｜个人学术主页

一个可直接部署到 GitHub Pages 的静态学术主页，并配套 Cloudflare Worker + D1 后端，用于匿名留言、访问记录与密码保护的管理后台。

正式站点：`https://bigwhitetofu.github.io/luo-yuying-academic-homepage/`

后端接口：`https://luo-yuying-academic-api.xujun1569.workers.dev`

## 本地预览

使用项目内的零依赖测试服务器：

```powershell
& "C:\Users\bigdarktofu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" .\scripts\mock-server.mjs
```

访问 `http://127.0.0.1:4173`。本地管理密码为 `XXX`，仅用于测试。

## GitHub Pages

1. 在 GitHub 新建公开仓库，例如 `academic-homepage`。
2. 将公开站点文件发布到 `gh-pages` 分支。
3. 在仓库 Settings → Pages 中选择 **Deploy from a branch**，分支设为 `gh-pages`、目录设为 `/ (root)`。
4. 当前正式地址为 `https://bigwhitetofu.github.io/luo-yuying-academic-homepage/`。

## Cloudflare Worker + D1

静态 GitHub Pages 不能安全保存 IP、留言或后台密码，因此这些功能放在 Worker。

```powershell
cd worker
pnpm install
pnpm exec wrangler login
pnpm exec wrangler d1 create luo-yuying-academic-site
```

1. 将 `wrangler.toml.example` 复制为 `wrangler.toml`，填入 D1 的 `database_id` 和 GitHub Pages 的正式域名。
2. 初始化数据库：`pnpm run db:remote`。
3. 设置三个秘密值：

```powershell
pnpm exec wrangler secret put ADMIN_PASSWORD
pnpm exec wrangler secret put ADMIN_TOKEN_SECRET
pnpm exec wrangler secret put IP_HASH_SECRET
```

4. 运行 `pnpm run deploy`，把得到的 `workers.dev` 地址填入根目录 `config.js`。

若不设置 `ADMIN_PASSWORD`，服务端会临时使用 `XXX`。正式上线前必须改成强密码；密码不会出现在主页前端代码中。

## 数据说明

- 每次访问分别记录，可按同一 IP 查看首次、最近访问时间和累计次数。
- 地理位置来自 Cloudflare 网络侧的粗粒度推断，不调用浏览器定位权限。
- 留言仅出现在密码保护的 `admin.html` 管理页。
- 留言接口限制同一 IP 每小时最多 5 条。
- 网站页脚已明确说明记录范围；如需减少个人数据，可删除数据库中的 `ip` 字段，仅保留 `ip_hash`。
