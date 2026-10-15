"use client";

import { useState } from "react";
import { siteUrl } from "../lib/site";

export function ProjectShare({ id, locale }: { id: string; locale: "en" | "zh" }) {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const url = new URL(`${siteUrl}/`);
  url.searchParams.set("lang", locale);
  url.hash = id;
  const href = url.href;
  async function copy() {
    try {
      await navigator.clipboard.writeText(href);
      setState("copied");
    } catch {
      setState("manual");
    }
  }
  return <div className="project-share">
    <button type="button" className="project-share-button" onClick={() => void copy()}>
      {locale === "zh" ? "复制项目链接" : "Copy project link"} <span aria-hidden="true">↗</span>
    </button>
    <span role="status" aria-live="polite">
      {state === "copied" && (locale === "zh" ? "链接已复制" : "Link copied")}
      {state === "manual" && <a href={href}>{locale === "zh" ? "请复制此直达链接" : "Copy this direct link"}</a>}
    </span>
  </div>;
}
