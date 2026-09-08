# Personal website template

Copy this repository, edit one configuration file, and publish your own page with GitHub Pages. You can do this entirely in the GitHub website. Local development tools are optional.

The page includes English and Chinese content, light and dark themes, and a mobile layout.

[Live example](https://tolkmislk.github.io/) · [中文教程](../README.md) · [Starter configuration](../examples/site.example.json) · [Screenshot walkthrough](walkthrough.md)

The live example uses NCC's profile. Replace it with your own name, background, and projects.

## 1. Copy the repository

Sign in to GitHub and click **Fork**, or [open the fork form](https://github.com/TolkmisLK/TolkmisLK.github.io/fork). Choose your account as the owner and name the repository `your-username.github.io`.

Use your GitHub username, not your display name. For example, `xiaoming` would use `xiaoming.github.io`. You only need the `main` branch. You can also rename your copy under **Settings → General → Repository name**.

If **Use this template** is available, choose **Create a new repository** instead. This copies the files without the original commit history. [GitHub's template guide](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

## 2. Enable publishing

In **your own repository**:

1. Open **Actions** and enable workflows if prompted.
2. Open **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.

The repository already includes a publishing workflow. Do not add another one or select “Deploy from a branch”: this site needs a build step. [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 3. Add your profile

Copy the full contents of [examples/site.example.json](../examples/site.example.json). Open `content/site.json` in your repository, click the pencil button, and replace its contents with the example.

Update the `identity` section:

| Field | Value |
| --- | --- |
| `name` | Your name or display name |
| `githubUsername` | Your GitHub username |
| `repositoryName` | Your repository name, such as `xiaoming.github.io` |
| `siteUrl` | The final website address, such as `https://xiaoming.github.io` |
| `defaultLocale` | `en` for English or `zh` for Chinese |
| `favicon` | Local icon path, such as `/favicon.svg`, or `""` |
| `socialImage` | Local preview image path, such as `/preview.png`, or `""` |

Then edit the `en` and `zh` sections:

| Field | Where it appears |
| --- | --- |
| `role` | Short introduction above your name |
| `subtitle` | Heading below your name |
| `intro` | Introductory paragraph |
| `experienceCopy` | Work or learning background |
| `focus` | Groups of technologies or subjects you are learning |
| `projects` | Project cards |

Keep the JSON field names, double quotes, commas, and brackets. Do not add a comma after the final item. Build errors identify configuration problems; a failed build does not replace the last successful deployment.

## 4. Save and publish

Click **Commit changes**, enter a short message such as “Add my profile,” and commit to `main`.

Open **Actions → Portfolio CI and GitHub Pages** and select the latest run. The `quality` job checks and builds the page; `deploy` publishes it. When both succeed, open **Settings → Pages → Visit site**, or visit the address in `siteUrl`.

An initial run may fail before Pages is configured. Complete the settings, save your profile, and run it again. Future changes committed to `main` publish automatically.

## Add projects

If you have no projects yet, leave `projects` as `[]` in both languages. The project section is hidden and the introductory button links to your background instead.

To add a project, put an object like this inside the `en.projects` array, then add its Chinese version to `zh.projects`:

```json
{
  "status": "In progress",
  "name": "My first project",
  "description": "A sentence about what the project does.",
  "primaryAction": "Source code",
  "primaryHref": "https://github.com/your-username/project-name",
  "secondaryAction": "Instructions",
  "secondaryHref": "https://github.com/your-username/project-name#readme",
  "details": [
    ["Built with", "HTML, CSS, JavaScript"],
    ["Run locally", "See the repository README"]
  ]
}
```

Separate multiple projects with commas. `status` can be a version or a short label. Set `details` to `[]` if you do not need the extra information.

## Appearance and images

Edit `app/globals.css` for colors, spacing, and layout. Upload your own files to `public/` and reference them as `/filename` in `favicon` or `socialImage`. Leave either field empty to omit it.

The example's `public/icon.svg`, `public/og.png`, and `public/og-card.svg` contain NCC branding. The starter configuration does not use them; you can delete or replace them. Browser titles, page descriptions, and sharing text come from your name and default-language profile.

## Troubleshooting

| Problem | Check |
| --- | --- |
| No template button | Use **Fork**. |
| You already have a `username.github.io` repository | Keep the existing site. Use a repository such as `my-site`, set `repositoryName` accordingly, and use `https://username.github.io/my-site` as `siteUrl`. Asset paths follow this address. |
| No workflow run | Enable workflows, then choose **Run workflow → main** on the workflow page. |
| Deployment fails | Set **Settings → Pages → Source** to **GitHub Actions**, then rerun. |
| Build fails | Open the failed step and fix the reported configuration or code error. |
| 404 page | Check that `deploy` succeeded and that the address matches `siteUrl`. |
| Missing styles on a project site | Include the repository path in `siteUrl`, then publish again. |
| NCC still appears | Check `content/site.json` in your own repository and the latest deployment status. |
| Language does not follow the default | The browser may remember an earlier choice. Use the language button. |

A custom domain is optional. GitHub Free supports Pages from public repositories; keep credentials out of public files. [Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Local development

Install Node.js 22 or later and npm. Download or clone your own copy and run these commands in its directory:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. If your site uses a repository path, append it, for example `http://localhost:3000/my-site`.

Before committing:

```bash
npm run check
npm run build
npm test
```

The static output is in `out/`. The site uses Next.js and has no backend, account system, or database.

## Files

| File | Purpose |
| --- | --- |
| `content/site.json` | Profile, languages, projects, and links |
| `examples/site.example.json` | Starter configuration |
| `app/portfolio.tsx` | Page structure and controls |
| `app/globals.css` | Colors and layout |
| `app/layout.tsx` | Metadata from your profile |
| `.github/workflows/pages.yml` | Checks and Pages deployment |
| `scripts/validate-site.mjs` | Configuration checks |

## Need help?

Open [Issues](https://github.com/TolkmisLK/TolkmisLK.github.io/issues/new/choose) and choose **Setup help**. Describe where you got stuck and include your public repository or failed Actions run URL if useful. Choose **Guide feedback** for unclear instructions. [Contributing](../CONTRIBUTING.md)

## License

[MIT](../LICENSE). You may copy, modify, and publish your version; keep the copyright notice in the license. Your page does not have to display NCC branding or link back to the original.
