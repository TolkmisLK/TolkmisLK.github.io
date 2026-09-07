"use client";

import { useEffect, useState } from "react";

type Locale = "en" | "zh";
type Theme = "system" | "light" | "dark";

const copy = {
  en: {
    nav: [
      ["Projects", "work"],
      ["Experience", "experience"],
      ["Technologies", "focus"],
      ["GitHub", "contact"],
    ],
    role: "Software engineer · 6 years of experience",
    title: "NCC",
    subtitle: "Full-stack development & AI agents",
    intro:
      "I work on web and mobile apps, backend services, and tools for AI agents.",
    explore: "View projects",
    github: "GitHub",
    experienceTitle: "Experience",
    experienceCopy:
      "I've worked on Flutter and Vue applications, enterprise management and auction systems, and healthcare IoT integrations for hospitals.",
    focusTitle: "Technologies",
    focus: [
      ["Frontend", ["TypeScript", "React", "Vue", "Flutter"]],
      ["Backend", ["Node.js", "Python", "Java", "Spring"]],
      ["AI tools", ["AI Agents", "MCP", "Tool Calling", "LLM Integration"]],
    ],
    workTitle: "Projects",
    projects: [
      {
        status: "v1.0.0",
        name: "Webhook Delivery Platform",
        description:
          "Sends events to HTTP endpoints and retries failed requests. The web console lets you manage endpoints, inspect each delivery attempt, and replay jobs.",
        primaryAction: "Source code",
        primaryHref: "https://github.com/TolkmisLK/webhook-delivery-platform",
        secondaryAction: "Quick start",
        secondaryHref:
          "https://github.com/TolkmisLK/webhook-delivery-platform#quick-start",
        details: [
          ["Built with", "Java, Spring Boot, PostgreSQL, and React"],
          [
            "Delivery",
            "At-least-once: receivers need to handle duplicate events",
          ],
          [
            "Try it",
            "Docker Compose includes a receiver that simulates failures",
          ],
        ],
      },
      {
        status: "v0.1.0 · Experimental",
        name: "MCP Trace Lab",
        description:
          "Records traffic between an MCP client and a stdio server. Use the command-line summary to check which tools were called, what failed, and how long responses took.",
        primaryAction: "Source code",
        primaryHref: "https://github.com/TolkmisLK/mcp-trace-lab",
        secondaryAction: "Quick start",
        secondaryHref:
          "https://github.com/TolkmisLK/mcp-trace-lab#quick-start--快速开始",
        details: [
          ["Built with", "TypeScript and Node.js"],
          ["Output", "Local JSONL traces with text or JSON summaries"],
          ["Scope", "stdio only; sensitive fields can be redacted by key name"],
        ],
      },
    ],
    contactTitle: "Questions about a project?",
    contactCopy:
      "You can ask questions, report bugs, or suggest changes in the project’s GitHub issues.",
    contactAction: "GitHub profile",
    backToTop: "Back to top",
    siteSource: "Site source",
    skipLink: "Skip to content",
    homeLabel: "NCC home",
    localeLabel: "切换为中文",
    theme: {
      system: "Theme: system",
      light: "Theme: light",
      dark: "Theme: dark",
    },
  },
  zh: {
    nav: [
      ["项目", "work"],
      ["经历", "experience"],
      ["技术栈", "focus"],
      ["GitHub", "contact"],
    ],
    role: "软件开发工程师 · 6 年开发经验",
    title: "NCC",
    subtitle: "全栈开发与 AI Agent",
    intro:
      "我做 Web 和移动端应用，也写后端服务。目前主要关注 AI Agent 和 MCP 相关工具。",
    explore: "查看项目",
    github: "GitHub",
    experienceTitle: "开发经历",
    experienceCopy:
      "做过 Flutter 和 Vue 应用、企业管理与拍卖系统，以及医院设备相关的软件集成。",
    focusTitle: "技术栈",
    focus: [
      ["前端", ["TypeScript", "React", "Vue", "Flutter"]],
      ["后端", ["Node.js", "Python", "Java", "Spring"]],
      ["AI 工具", ["AI Agents", "MCP", "Tool Calling", "LLM Integration"]],
    ],
    workTitle: "项目",
    projects: [
      {
        status: "v1.0.0",
        name: "可靠 Webhook 推送平台",
        description:
          "将事件推送到 HTTP 接口，失败后自动重试。可以在网页控制台管理接收地址、查看每次请求的结果，并手动重新推送。",
        primaryAction: "查看代码",
        primaryHref: "https://github.com/TolkmisLK/webhook-delivery-platform",
        secondaryAction: "运行说明",
        secondaryHref:
          "https://github.com/TolkmisLK/webhook-delivery-platform#快速开始",
        details: [
          ["技术栈", "Java、Spring Boot、PostgreSQL、React"],
          ["投递方式", "至少一次投递，接收方需要处理重复事件"],
          ["本地运行", "Docker Compose 附带可模拟请求失败的接收服务"],
        ],
      },
      {
        status: "v0.1.0 · 实验阶段",
        name: "MCP Trace Lab",
        description:
          "记录 MCP 客户端与 stdio 服务端之间的通信。通过命令行查看调用了哪些工具、哪些请求出错，以及响应花了多长时间。",
        primaryAction: "查看代码",
        primaryHref: "https://github.com/TolkmisLK/mcp-trace-lab",
        secondaryAction: "运行说明",
        secondaryHref:
          "https://github.com/TolkmisLK/mcp-trace-lab#quick-start--快速开始",
        details: [
          ["技术栈", "TypeScript、Node.js"],
          ["输出", "本地 JSONL 记录，以及文本或 JSON 格式的分析摘要"],
          ["支持范围", "目前仅支持 stdio，可按字段名配置脱敏"],
        ],
      },
    ],
    contactTitle: "交流与反馈",
    contactCopy: "使用中遇到问题，或者有改进建议，可以在对应仓库提交 Issue。",
    contactAction: "打开 GitHub 主页",
    backToTop: "返回顶部",
    siteSource: "网站源码",
    skipLink: "跳转到正文",
    homeLabel: "NCC 首页",
    localeLabel: "Switch to English",
    theme: {
      system: "主题：跟随系统",
      light: "主题：浅色",
      dark: "主题：深色",
    },
  },
} as const;

const themeOrder: Theme[] = ["system", "light", "dark"];

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("system");
  const content = copy[locale];

  useEffect(() => {
    const syncSavedPreferences = () => {
      const savedLocale = readPreference("ncc-locale");
      const savedTheme = readPreference("ncc-theme");

      if (savedLocale === "en" || savedLocale === "zh") {
        setLocale(savedLocale);
      }

      if (
        savedTheme === "system" ||
        savedTheme === "light" ||
        savedTheme === "dark"
      ) {
        setTheme(savedTheme);
        applyTheme(savedTheme);
      }
    };

    queueMicrotask(syncSavedPreferences);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const themeMark = { system: "◐", light: "☼", dark: "☾" }[theme];

  function toggleLocale() {
    const nextLocale: Locale = locale === "en" ? "zh" : "en";
    setLocale(nextLocale);
    savePreference("ncc-locale", nextLocale);
  }

  function cycleTheme() {
    const nextTheme =
      themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    setTheme(nextTheme);
    applyTheme(nextTheme);
    savePreference("ncc-theme", nextTheme);
  }

  return (
    <div data-portfolio-root>
      <a className="skip-link" href="#top">
        {content.skipLink}
      </a>
      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="brand" href="#top" aria-label={content.homeLabel}>
            NCC
          </a>
          <nav
            className="nav"
            aria-label={locale === "en" ? "Primary navigation" : "主导航"}
          >
            {content.nav.map(([label, href]) => (
              <a key={href} href={`#${href}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="control-button"
              type="button"
              onClick={toggleLocale}
              aria-label={content.localeLabel}
            >
              <span lang={locale === "en" ? "zh-CN" : "en"}>
                {locale === "en" ? "中文" : "EN"}
              </span>
            </button>
            <button
              className="control-button"
              type="button"
              onClick={cycleTheme}
              aria-label={content.theme[theme]}
              title={content.theme[theme]}
            >
              <span aria-hidden="true">{themeMark}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="site-shell" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">{content.role}</p>
            <h1 id="hero-title">
              {content.title}
              <span>{content.subtitle}</span>
            </h1>
            <p className="hero-copy">{content.intro}</p>
            <div className="hero-actions">
              <a className="primary-link" href="#work">
                {content.explore}
              </a>
              <a
                className="secondary-link"
                href="https://github.com/TolkmisLK"
                target="_blank"
                rel="noreferrer"
              >
                {content.github} ↗
              </a>
            </div>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">{content.workTitle}</h2>
          </div>
          <div className="work-list">
            {content.projects.map((project) => (
              <article className="work-card" key={project.name}>
                <div className="work-summary">
                  <p className="work-kicker">{project.status}</p>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="work-actions">
                    <a
                      className="primary-link"
                      href={project.primaryHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.primaryAction} ↗
                    </a>
                    <a
                      className="secondary-link"
                      href={project.secondaryHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.secondaryAction} ↗
                    </a>
                  </div>
                </div>
                <dl className="project-details">
                  {project.details.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="section experience-section"
          aria-labelledby="experience-title"
        >
          <h2 id="experience-title">{content.experienceTitle}</h2>
          <p>{content.experienceCopy}</p>
        </section>

        <section id="focus" className="section" aria-labelledby="focus-title">
          <div className="section-heading">
            <h2 id="focus-title">{content.focusTitle}</h2>
          </div>
          <div className="focus-grid">
            {content.focus.map(([title, capabilities]) => (
              <article className="focus-card" key={title}>
                <h3>{title}</h3>
                <ul className="capability-list">
                  {capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="section"
          aria-labelledby="contact-title"
        >
          <div className="contact-panel">
            <div>
              <h2 id="contact-title">{content.contactTitle}</h2>
              <p className="contact-copy">{content.contactCopy}</p>
            </div>
            <a
              className="primary-link"
              href="https://github.com/TolkmisLK"
              target="_blank"
              rel="noreferrer"
            >
              {content.contactAction} ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell footer-inner">
          <span>© {new Date().getFullYear()} NCC</span>
          <div className="footer-links">
            <a
              className="text-link"
              href="https://github.com/TolkmisLK/TolkmisLK.github.io"
            >
              {content.siteSource}
            </a>
            <a className="text-link" href="#top">
              {content.backToTop}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function applyTheme(theme: Theme) {
  if (theme === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.dataset.theme = theme;
  }
}

function readPreference(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The controls still work when browser storage is unavailable.
  }
}
