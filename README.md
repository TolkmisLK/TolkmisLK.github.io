# NCC Engineering Portfolio

[English](#english) · [中文](#中文)

## English

A bilingual, static engineering portfolio for NCC. The site presents six years of software development experience without exposing confidential employers, clients, or project details.

### What this repository demonstrates

- A focused, responsive one-page information architecture
- English-first content with a Chinese language switch
- System-aware light and dark themes with a manual override
- Accessible semantic HTML and reduced-motion support
- Strict TypeScript, linting, static export tests, and GitHub Actions
- Automated deployment to GitHub Pages after approved changes reach `main`

### Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

### Quality checks

```bash
npm run check
npm run build
npm test
```

The build produces a static site in `out/`.

### Architecture

The site uses Next.js App Router with static export. Public content is defined locally in a client component so language and theme preferences remain device-local. There is no backend, database, authentication, analytics, or runtime secret.

### Deployment

The workflow in `.github/workflows/pages.yml` validates pull requests and deploys the static `out/` artifact only after a merge to `main`. The intended repository name is `tolkmislk.github.io`, which serves the site at `https://tolkmislk.github.io`.

## 中文

这是 NCC 的中英文个人工程主页。网站用于展示六年软件开发经验，同时避免公开公司、客户及商业项目的敏感信息。

### 仓库体现的工程能力

- 聚焦、响应式的单页信息架构
- 英文优先并支持中文切换
- 跟随系统的深浅主题及手动覆盖
- 语义化 HTML、键盘可访问性和减少动画支持
- 严格 TypeScript、代码检查、静态导出测试及 GitHub Actions
- 合并到 `main` 后自动部署 GitHub Pages

### 本地开发

```bash
npm ci
npm run dev
```

访问 `http://localhost:3000`。

### 质量检查

```bash
npm run check
npm run build
npm test
```

构建结果位于 `out/`。

### 架构说明

项目使用 Next.js App Router 静态导出。公开内容维护在本地组件中，语言与主题偏好仅保存在访问者设备中。项目不包含后端、数据库、认证、分析服务或运行时密钥。

### 部署

`.github/workflows/pages.yml` 会验证 Pull Request，并仅在改动合并至 `main` 后部署静态产物。目标仓库名称为 `tolkmislk.github.io`，访问地址为 `https://tolkmislk.github.io`。
