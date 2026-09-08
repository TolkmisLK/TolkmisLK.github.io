import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export function validateSite(config) {
  const fail = (path, message) => {
    throw new Error(`${path}: ${message}`);
  };
  const text = (value, path) => {
    if (typeof value !== "string" || !value.trim())
      fail(path, "请输入文字 / enter text");
  };
  const url = (value, path) => {
    text(value, path);
    let parsed;
    try {
      parsed = new URL(value);
    } catch {
      fail(path, "请输入完整网址 / enter a full URL");
    }
    if (
      !["http:", "https:"].includes(parsed.protocol) ||
      parsed.username ||
      parsed.password
    )
      fail(
        path,
        "请使用 http 或 https 网址 / use an HTTP(S) URL without credentials",
      );
    return parsed;
  };
  const pairs = (value, path) => {
    if (!Array.isArray(value)) fail(path, "应为列表 / expected an array");
    for (const [index, pair] of value.entries()) {
      if (!Array.isArray(pair) || pair.length !== 2)
        fail(`${path}[${index}]`, "需要两项 / expected a pair");
      pair.forEach((part, i) => text(part, `${path}[${index}][${i}]`));
    }
  };
  if (!config?.identity) fail("identity", "缺少个人信息 / missing identity");
  const identity = config.identity;
  text(identity.name, "identity.name");
  if (!/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(identity.githubUsername ?? ""))
    fail(
      "identity.githubUsername",
      "填写 GitHub 用户名，不是邮箱或昵称 / use your GitHub username",
    );
  if (!/^[\w.-]+$/.test(identity.repositoryName ?? ""))
    fail("identity.repositoryName", "填写仓库名称 / enter a repository name");
  const base = url(identity.siteUrl, "identity.siteUrl");
  if (base.search || base.hash)
    fail(
      "identity.siteUrl",
      "网址不要带查询参数或 # / omit query and fragment",
    );
  if (!["en", "zh"].includes(identity.defaultLocale))
    fail("identity.defaultLocale", '只能填 "en" 或 "zh" / use "en" or "zh"');
  for (const key of ["favicon", "socialImage"]) {
    const value = identity[key];
    if (
      typeof value !== "string" ||
      (value &&
        (!value.startsWith("/") ||
          value.startsWith("//") ||
          /[?#\\]/.test(value)))
    )
      fail(
        `identity.${key}`,
        '填写 / 开头的本地图片路径，或留空 "" / use a local /path or an empty string',
      );
  }
  for (const locale of ["en", "zh"]) {
    const profile = config[locale];
    if (!profile) fail(locale, "缺少该语言内容 / missing language content");
    for (const key of ["role", "subtitle", "intro", "experienceCopy"])
      text(profile[key], `${locale}.${key}`);
    if (!Array.isArray(profile.focus))
      fail(`${locale}.focus`, "应为列表 / expected an array");
    for (const [index, group] of profile.focus.entries()) {
      if (
        !Array.isArray(group) ||
        group.length !== 2 ||
        !Array.isArray(group[1])
      )
        fail(
          `${locale}.focus[${index}]`,
          "格式应为 [标题, [技术名称]] / expected [title, [skills]]",
        );
      text(group[0], `${locale}.focus[${index}][0]`);
      group[1].forEach((skill, i) =>
        text(skill, `${locale}.focus[${index}][1][${i}]`),
      );
    }
    if (!Array.isArray(profile.projects))
      fail(`${locale}.projects`, "应为列表 / expected an array");
    const names = new Set();
    for (const [index, project] of profile.projects.entries()) {
      const path = `${locale}.projects[${index}]`;
      if (!project || typeof project !== "object")
        fail(path, "需要项目对象 / expected a project object");
      for (const key of [
        "name",
        "status",
        "description",
        "primaryAction",
        "secondaryAction",
      ])
        text(project[key], `${path}.${key}`);
      if (names.has(project.name))
        fail(`${path}.name`, "项目名称不能重复 / project names must be unique");
      names.add(project.name);
      url(project.primaryHref, `${path}.primaryHref`);
      url(project.secondaryHref, `${path}.secondaryHref`);
      pairs(project.details, `${path}.details`);
    }
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    const config = JSON.parse(
      await readFile(new URL("../content/site.json", import.meta.url), "utf8"),
    );
    validateSite(config);
    console.log("Site configuration OK / 网站配置检查通过");
  } catch (error) {
    console.error(`content/site.json\n${error.message}`);
    process.exitCode = 1;
  }
}
