import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(
  new URL("../out/index.html", import.meta.url),
  "utf8",
);
const config = JSON.parse(
  await readFile(new URL("../content/site.json", import.meta.url), "utf8"),
);
const locale = config.identity.defaultLocale;
const profile = config[locale];
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

test("renders the configured profile and default language", () => {
  assert.ok(html.includes(`lang="${locale === "zh" ? "zh-CN" : "en"}"`));
  assert.ok(html.includes(`id="hero-title">${escape(config.identity.name)}`));
  assert.ok(html.includes(escape(profile.intro)));
  assert.ok(
    html.includes(
      `href="${escape(config.identity.siteUrl.replace(/\/$/, ""))}/"`,
    ),
  );
});

test("keeps navigation and project links valid for the configured content", () => {
  for (const id of ["experience", "focus", "contact"])
    assert.ok(html.includes(`id="${id}"`));
  assert.equal(html.includes('id="work"'), profile.projects.length > 0);
  for (const [, anchor] of html.matchAll(/href="#([^" ]+)"/g)) {
    assert.ok(html.includes(`id="${anchor}"`), `Missing target: ${anchor}`);
  }
  assert.match(html, /<main[^>]+id="top"[^>]+tabindex="-1"/);
  for (const project of profile.projects) {
    assert.ok(html.includes(escape(project.name)));
    for (const url of [project.primaryHref, project.secondaryHref])
      assert.ok(html.includes(`href="${escape(url)}"`));
  }
  const github = `https://github.com/${config.identity.githubUsername}`;
  assert.ok(html.includes(`href="${github}"`));
  assert.ok(
    html.includes(`href="${github}/${config.identity.repositoryName}"`),
  );
});

test("renders language, theme, and optional image settings", () => {
  assert.ok(
    html.includes(
      `aria-label="${locale === "zh" ? "Switch to English" : "切换为中文"}"`,
    ),
  );
  assert.ok(
    html.includes(
      `aria-label="${locale === "zh" ? "主题：跟随系统" : "Theme: system"}"`,
    ),
  );
  assert.equal(
    html.includes('property="og:image"'),
    Boolean(config.identity.socialImage),
  );
  assert.equal(html.includes('rel="icon"'), Boolean(config.identity.favicon));
});
