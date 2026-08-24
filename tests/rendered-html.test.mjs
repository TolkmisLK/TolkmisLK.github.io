import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

test("exports the portfolio as accessible semantic HTML", () => {
  assert.match(html, /<html[^>]+lang="en"/);
  assert.match(html, /<h1[^>]*id="hero-title"[^>]*>NCC/);
  assert.match(html, /id="experience"/);
  assert.match(html, /id="focus"/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="principles"/);
  assert.match(html, /id="contact"/);
});

test("links public claims to runnable proof", () => {
  assert.match(html, /NCC Engineering Portfolio/);
  assert.match(html, /Next\.js static export hosted on GitHub Pages/);
  assert.match(html, /href="https:\/\/tolkmislk\.github\.io\/"/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/TolkmisLK\/TolkmisLK\.github\.io"/,
  );
});

test("contains honest public positioning without confidential claims", () => {
  assert.match(html, /6 years of experience/);
  assert.match(html, /healthcare IoT/i);
  assert.match(html, /AI agent/i);
  assert.doesNotMatch(html, /trading|profit|hospital name|client name/i);
});
