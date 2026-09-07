import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(
  new URL("../out/index.html", import.meta.url),
  "utf8",
);

test("exports the portfolio as accessible semantic HTML", () => {
  assert.match(html, /<html[^>]+lang="en"/);
  assert.match(html, /<h1[^>]*id="hero-title"[^>]*>NCC/);
  for (const id of ["experience", "focus", "work", "contact"]) {
    assert.ok(html.includes(`id="${id}"`));
  }
  assert.ok(html.indexOf('id="work"') < html.indexOf('id="experience"'));
  assert.match(html, /<main[^>]+id="top"[^>]+tabindex="-1"/);
  for (const [, anchor] of html.matchAll(/href="#([^" ]+)"/g)) {
    assert.ok(html.includes(`id="${anchor}"`), `Missing target: ${anchor}`);
  }
});

test("links projects to their source and quick-start instructions", () => {
  for (const repo of ["webhook-delivery-platform", "mcp-trace-lab"]) {
    const url = `https://github.com/TolkmisLK/${repo}`;
    assert.ok(html.includes(`href="${url}"`));
  }
  assert.ok(
    html.includes('href="https://github.com/TolkmisLK/TolkmisLK.github.io"'),
  );
  assert.ok(
    html.includes(
      'href="https://github.com/TolkmisLK/webhook-delivery-platform#quick-start"',
    ),
  );
  assert.ok(
    html.includes(
      'href="https://github.com/TolkmisLK/mcp-trace-lab#quick-start--快速开始"',
    ),
  );
  assert.match(html, /Webhook Delivery Platform/);
  assert.match(html, /MCP Trace Lab/);
});

test("includes the developer introduction and language and theme controls", () => {
  assert.match(html, /6 years of experience/);
  assert.match(html, /healthcare IoT/i);
  assert.match(html, /AI agent/i);
  assert.match(html, /<button[^>]+aria-label="切换为中文"/);
  assert.match(html, /<button[^>]+aria-label="Theme: system"/);
});
