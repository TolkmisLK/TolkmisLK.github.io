# 个人网页模板

想做一个介绍自己、展示项目的网页，可以从这里开始。复制仓库，修改一份配置文件，再发布到 GitHub Pages。整个过程可以在浏览器里完成，不需要先安装开发工具。

支持中英文切换、浅色和深色主题，也可以在手机上浏览。

[看看页面长什么样](https://tolkmislk.github.io/) · [English guide](docs/README.en.md) · [空白配置示例](examples/site.example.json)

线上示例使用 NCC 的资料。复制后可以换成自己的名字、介绍、经历和项目。

## 从这里开始

### 1. 复制到自己的账号

登录 GitHub，点击本仓库右上方的 **Fork**，或者[直接打开复制页面](https://github.com/TolkmisLK/TolkmisLK.github.io/fork)。Owner 选择自己的账号。

仓库名填 `你的用户名.github.io`，例如用户名是 `xiaoming`，就填 `xiaoming.github.io`。这里用的是 GitHub 用户名，不是显示昵称。

如果复制时没有改名，可以到自己的仓库 **Settings → General → Repository name** 修改。创建时只需要 `main` 分支。

如果看到了 **Use this template**，也可以选择 **Create a new repository**，填写同样的名称。它会复制文件，不带原仓库的提交历史。[GitHub 的模板使用说明](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

### 2. 开启网页发布

接下来的操作都在**你自己复制出来的仓库**里进行。

1. 打开 **Actions**；如果出现启用工作流的提示，先启用。
2. 打开 **Settings → Pages**。
3. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。

仓库已经带有发布流程，不需要再添加 GitHub 推荐的其他工作流。这里不要选“Deploy from a branch”，因为网页需要先构建。[GitHub Pages 设置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

### 3. 填写自己的资料

打开 [examples/site.example.json](examples/site.example.json)，复制全部内容。再打开自己仓库里的 `content/site.json`，点击铅笔按钮，将内容全部替换为刚才复制的示例。

先修改开头的 `identity`：

| 字段 | 填什么 | 例子 |
| --- | --- | --- |
| `name` | 页面上显示的名字或昵称 | `小明` |
| `githubUsername` | GitHub 用户名 | `xiaoming` |
| `repositoryName` | 当前仓库名 | `xiaoming.github.io` |
| `siteUrl` | 发布后的网站地址 | `https://xiaoming.github.io` |
| `defaultLocale` | 首次打开时的语言 | `zh` 为中文，`en` 为英文 |
| `favicon` | 标签页小图标；暂时没有就留空 | `""` |
| `socialImage` | 分享链接时的预览图片；暂时没有就留空 | `""` |

然后修改 `zh`（中文）和 `en`（英文）里的内容：

| 字段 | 页面上的位置 |
| --- | --- |
| `role` | 名字上方的一行介绍 |
| `subtitle` | 名字下方的标题 |
| `intro` | 首屏自我介绍 |
| `experienceCopy` | 开发经历；也可以写学习经历 |
| `focus` | 技术或正在学习的内容 |
| `projects` | 项目列表 |

默认语言只决定第一次打开时显示什么。访问者之后可以自行切换，浏览器会记住选择。

JSON 的字段名、双引号、逗号和括号需要保留。可以先只改引号内的文字；最后一项后面不要多加逗号。文件写错时，Actions 会提示出错位置，不会替换掉已经发布成功的页面。

### 4. 保存并等待发布

点击 **Commit changes**，写一句简短记录，例如“填写个人资料”，提交到 `main`。

打开 **Actions → Portfolio CI and GitHub Pages**，点最新的一次运行。`quality` 是检查和构建，`deploy` 是发布。两项都成功后，打开 **Settings → Pages → Visit site**，或者访问你填写的 `siteUrl`。

第一次复制时如果出现失败记录，先完成 Pages 设置并保存个人资料，再运行一次。以后修改配置并提交到 `main`，网站就会自动更新。

## 添加自己的项目

没有项目时，让中英文的 `projects` 都保持 `[]`。页面会隐藏项目区，首屏按钮会转到经历部分。

有项目后，可以把下面这项放入 `zh.projects` 的方括号里，再在 `en.projects` 中填写对应英文：

```json
{
  "status": "开发中",
  "name": "我的第一个项目",
  "description": "一句话介绍项目可以做什么。",
  "primaryAction": "查看代码",
  "primaryHref": "https://github.com/你的用户名/项目仓库名",
  "secondaryAction": "使用说明",
  "secondaryHref": "https://github.com/你的用户名/项目仓库名#readme",
  "details": [
    ["使用的技术", "HTML、CSS、JavaScript"],
    ["运行方法", "打开 README 查看步骤"]
  ]
}
```

多个项目之间用逗号隔开。`status` 可以写“开发中”“已发布”或版本号；`details` 是卡片右侧的信息列表，不需要时可以填 `[]`。

## 修改外观与图片

- **颜色和间距：** 修改 `app/globals.css`。开头是浅色与深色主题的颜色，下面是各区域布局。
- **网页小图标：** 将自己的图标上传到 `public/`，例如 `favicon.svg`，再把 `favicon` 填为 `/favicon.svg`。
- **分享预览图：** 将图片上传到 `public/`，例如 `preview.png`，再把 `socialImage` 填为 `/preview.png`。建议横向图片；没有图片就留空。
- **标题和简介：** 浏览器标题、搜索描述和分享文字会读取名字及默认语言的介绍，不需要再到其他文件重复修改。

`public/icon.svg`、`public/og.png` 和 `public/og-card.svg` 是 NCC 示例的图片。使用空白配置时不会引用它们，可以删除或换成自己的文件。

## 常见问题

| 遇到的问题 | 可以怎么检查 |
| --- | --- |
| 找不到 `Use this template` | 直接使用 `Fork`，后面的步骤相同。 |
| 已经有一个 `用户名.github.io` 仓库 | 不要覆盖现有网站。可使用 `my-site` 等名称，并将 `repositoryName` 改成它、`siteUrl` 改成 `https://用户名.github.io/my-site`。模板会按地址设置资源路径。 |
| Actions 没有自动运行 | 确认工作流已启用。进入工作流，点 **Run workflow**，选择 `main`。 |
| `deploy` 失败或提示找不到 Pages | 确认 **Settings → Pages → Source** 为 **GitHub Actions**，再重新运行。 |
| `quality` 失败 | 打开失败步骤，查看配置、类型或构建错误；不要删除检查步骤。 |
| 网页 404 | 确认 `deploy` 已成功，地址与 `siteUrl` 一致，仓库名拼写正确。 |
| 页面没有样式 | 如果用了 `my-site` 这样的仓库名，`siteUrl` 必须包含 `/my-site`，修改后重新发布。 |
| 仍显示 NCC 的内容 | 检查修改的是自己仓库的 `content/site.json`，并确认最新部署成功。 |
| 中文没有跟随默认语言变化 | 浏览器可能记住了之前的选择，点击页面右上角语言按钮。 |
| 没有自己的域名 | 可以直接使用 GitHub 提供的 `github.io` 地址。 |
| GitHub Free 能不能用 | 可以，按本教程创建公开仓库；不要把密码、令牌等内容放进页面配置。[Pages 使用范围](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) |

## 想在电脑上修改

需要 Node.js 22 或更新版本，以及 npm。下载或克隆**自己的仓库**后，在项目目录运行：

```bash
npm ci
npm run dev
```

浏览器打开 `http://localhost:3000`。如果 `siteUrl` 包含 `/my-site`，则打开 `http://localhost:3000/my-site`。

提交前可以运行：

```bash
npm run check
npm run build
npm test
```

构建结果在 `out/`。页面使用 Next.js 静态导出，没有后台、账号系统或数据库。

## 文件在哪

| 文件 | 用途 |
| --- | --- |
| `content/site.json` | 个人资料、中英文内容、项目和链接 |
| `examples/site.example.json` | 可直接复制的空白示例 |
| `app/portfolio.tsx` | 页面结构、语言和主题按钮 |
| `app/globals.css` | 颜色、字号和布局 |
| `app/layout.tsx` | 从配置生成网页元信息 |
| `.github/workflows/pages.yml` | 检查并发布到 GitHub Pages |
| `scripts/validate-site.mjs` | 检查配置，提示填写错误 |

## 使用许可

[MIT License](LICENSE)。可以复制、修改和发布自己的版本，请保留许可证中的版权声明。页面上不强制展示 NCC 名称或链接。
