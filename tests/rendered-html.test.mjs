import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

test("exports the portfolio as accessible semantic HTML", () => {
  assert.match(html, /<html[^>]+lang="en"/);
  assert.match(html, /<h1[^>]*id="hero-title"[^>]*>NCC/);
  for (const id of ["experience", "focus", "work", "contact"]) {
    assert.ok(html.includes(`id="${id}"`));
  }
  for (const [, anchor] of html.matchAll(/href="#([^" ]+)"/g)) {
    assert.ok(html.includes(`id="${anchor}"`), `Missing target: ${anchor}`);
  }
});

test("links projects to their source and documentation", () => {
  for (const repo of ["webhook-delivery-platform", "mcp-trace-lab"]) {
    const url = `https://github.com/TolkmisLK/${repo}`;
    assert.ok(html.includes(`href="${url}"`));
    assert.ok(html.includes(`href="${url}/blob/main/docs/architecture.md"`));
  }
  assert.ok(html.includes('href="https://github.com/TolkmisLK/TolkmisLK.github.io"'));
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
