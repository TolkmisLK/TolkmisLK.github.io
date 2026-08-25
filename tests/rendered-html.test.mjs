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
  assert.match(html, /Reliable Webhook Delivery Platform/);
  assert.match(html, /durable PostgreSQL queue/);
  assert.match(html, /Public · v0\.2/);
  assert.match(html, /after-commit Micrometer metrics/);
  assert.match(
    html,
    /12 unit and architecture tests, 2 PostgreSQL integration scenarios/,
  );
  assert.match(
    html,
    /href="https:\/\/github\.com\/TolkmisLK\/webhook-delivery-platform"/,
  );
  assert.match(
    html,
    /href="https:\/\/github\.com\/TolkmisLK\/webhook-delivery-platform\/blob\/main\/docs\/architecture\.md"/,
  );
  assert.match(html, /MCP Trace Lab/);
  assert.match(html, /Transparent JSON-RPC forwarding with bidirectional backpressure/);
  assert.match(html, /href="https:\/\/github\.com\/TolkmisLK\/mcp-trace-lab"/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/TolkmisLK\/mcp-trace-lab\/blob\/main\/docs\/architecture\.md"/,
  );
  assert.match(html, /NCC Engineering Portfolio/);
  assert.match(html, /Next\.js static export hosted on GitHub Pages/);
  assert.match(html, /href="https:\/\/tolkmislk\.github\.io\/"/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/TolkmisLK\/TolkmisLK\.github\.io"/,
  );
});

test("keeps portfolio positioning focused on approved public evidence", () => {
  assert.match(html, /6 years of experience/);
  assert.match(html, /healthcare IoT/i);
  assert.match(html, /AI agent/i);
  assert.match(
    html,
    /Static output published through review-gated GitHub Pages automation/,
  );
  assert.match(
    html,
    /Built to make engineering decisions and public work easy to review/,
  );
});
