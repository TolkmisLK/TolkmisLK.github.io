# NCC — Personal site / 个人网站

[tolkmislk.github.io](https://tolkmislk.github.io/)

My personal site, with a short introduction and links to my projects. Built with Next.js and hosted on GitHub Pages. Supports English and Chinese, with light and dark themes.

我的个人网站，介绍开发经历和开源项目。使用 Next.js 构建，托管在 GitHub Pages，支持中英文切换和深浅主题。

## Local development / 本地开发

```bash
npm ci
npm run dev
```

Open / 访问 `http://localhost:3000`.

## Checks and build / 检查与构建

```bash
npm run check
npm run build
npm test
```

The static output is written to `out/`. GitHub Actions checks pull requests and deploys changes on `main` to GitHub Pages.

静态文件输出到 `out/`。GitHub Actions 会检查 Pull Request，并将 `main` 分支的改动部署到 GitHub Pages。

## Editing content / 修改内容

- `app/portfolio.tsx`: English and Chinese copy, project links, language and theme controls. / 中英文文案、项目链接、语言与主题切换。
- `app/globals.css`: Layout and styles. / 页面布局与样式。
- `app/layout.tsx`: Page metadata. / 页面元信息。

Language and theme preferences are saved in the visitor's browser.

语言和主题偏好保存在访问者的浏览器中。
