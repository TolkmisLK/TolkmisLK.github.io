import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validateSite } from "../scripts/validate-site.mjs";

const example = JSON.parse(
  await readFile(
    new URL("../examples/site.example.json", import.meta.url),
    "utf8",
  ),
);

test("accepts a beginner profile with no projects and no images", () => {
  assert.doesNotThrow(() => validateSite(example));
});

test("reports the field when a project link uses an unsafe scheme", () => {
  const config = structuredClone(example);
  config.en.projects = [
    {
      name: "Example",
      status: "Demo",
      description: "Example project",
      primaryAction: "Open",
      primaryHref: "javascript:alert(1)",
      secondaryAction: "Docs",
      secondaryHref: "https://example.com",
      details: [],
    },
  ];
  assert.throws(() => validateSite(config), /en\.projects\[0\]\.primaryHref/);
});

test("reports incomplete translations and invalid skill groups", () => {
  const missingLanguage = structuredClone(example);
  delete missingLanguage.zh;
  assert.throws(() => validateSite(missingLanguage), /zh/);
  const wrongSkills = structuredClone(example);
  wrongSkills.zh.focus = [["Learning", "HTML"]];
  assert.throws(() => validateSite(wrongSkills), /zh\.focus\[0\]/);
});
