# NCC Engineering Portfolio

[English](#english) · [中文](#中文)

## English

A bilingual, static engineering portfolio for NCC, presenting six years of software development experience and verifiable public engineering work.

**Live site:** [tolkmislk.github.io](https://tolkmislk.github.io/)

### What this repository demonstrates

- A focused, responsive one-page information architecture
- English-first content with a Chinese language switch
- System-aware light and dark themes with a manual override
- Accessible semantic HTML and reduced-motion support
- A selected-work case study that connects public claims to live and reviewable proof
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

The site uses Next.js App Router with static export. Public content is defined locally in a client component, while language and theme preferences remain device-local.

### Deployment

The workflow in `.github/workflows/pages.yml` validates pull requests and deploys the static `out/` artifact only after a merge to `main`. The repository is published at `https://tolkmislk.github.io`.

## 中文

这是 NCC 的中英文个人工程主页，用于呈现六年软件开发经验与可验证的公开工程作品。

**线上地址：** [tolkmislk.github.io](https://tolkmislk.github.io/)

### 仓库体现的工程能力

- 聚焦、响应式的单页信息架构
- 英文优先并支持中文切换
- 跟随系统的深浅主题及手动覆盖
- 语义化 HTML、键盘可访问性和减少动画支持
- 通过公开作品案例将能力描述连接到可运行、可审查的证据
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

项目使用 Next.js App Router 静态导出。页面内容维护在本地组件中，语言与主题偏好保存在访问者设备中。

### 部署

`.github/workflows/pages.yml` 会验证 Pull Request，并仅在改动合并至 `main` 后部署静态产物。当前线上地址为 `https://tolkmislk.github.io`。
