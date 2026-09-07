"use client";

import { useEffect, useMemo, useState } from "react";

type Locale = "en" | "zh";
type Theme = "system" | "light" | "dark";

const copy = {
  en: {
    nav: [["Experience", "experience"], ["Technologies", "focus"], ["Projects", "work"], ["GitHub", "contact"]],
    role: "Software engineer · 6 years of experience",
    title: "NCC",
    subtitle: "Full-stack development & AI agents",
    intro: "I've worked on web and mobile apps, enterprise management and auction systems, and healthcare IoT integrations. These days, I'm focused on full-stack development and tools for AI agents.",
    explore: "View projects",
    github: "GitHub",
    signalLabel: "Projects at a glance",
    signals: [
      ["01", "Webhook delivery", "Send events, retry failures, and inspect delivery history."],
      ["02", "MCP tracing", "Record tool calls and check errors and response times."],
      ["03", "Personal site", "A place for my background and project links."],
    ],
    experienceLabel: "Experience",
    experienceTitle: "What I've worked on",
    experiences: [
      ["Web and mobile apps", "Application development with Flutter and Vue."],
      ["Management systems", "Software for day-to-day business operations."],
      ["Auction software", "Enterprise auction applications."],
      ["Healthcare IoT", "Software integrations for devices used in hospitals."],
    ],
    focusLabel: "Technologies",
    focusTitle: "What I work with",
    focus: [
      ["Frontend", "Web interfaces and mobile applications.", ["TypeScript", "React", "Vue", "Flutter"]],
      ["Backend", "APIs, application services, and system integrations.", ["Node.js", "Python", "Java", "Spring"]],
      ["AI tools", "LLM integration, tool calling, and MCP debugging.", ["AI Agents", "MCP", "Tool Calling", "LLM Integration"]],
    ],
    workLabel: "Projects",
    workTitle: "Code and documentation",
    projects: [
      {
        status: "v1.0.0",
        name: "Webhook Delivery Platform",
        description: "Sends events to HTTP endpoints and retries failed requests. The web console lets you manage endpoints, inspect each delivery attempt, and replay jobs.",
        primaryAction: "Source code",
        primaryHref: "https://github.com/TolkmisLK/webhook-delivery-platform",
        secondaryAction: "Architecture",
        secondaryHref: "https://github.com/TolkmisLK/webhook-delivery-platform/blob/main/docs/architecture.md",
        proof: [
          ["Built with", "Java, Spring Boot, PostgreSQL, and React"],
          ["Delivery", "Database queue, automatic retries, and signed HTTP requests"],
          ["Console", "Endpoint settings, attempt history, cancellation, and replay"],
          ["Try it", "Docker Compose includes a receiver that simulates failures"],
        ],
      },
      {
        status: "v0.1.0 · Experimental",
        name: "MCP Trace Lab",
        description: "Records traffic between an MCP client and a stdio server. Use the command-line summary to check which tools were called, what failed, and how long responses took.",
        primaryAction: "Source code",
        primaryHref: "https://github.com/TolkmisLK/mcp-trace-lab",
        secondaryAction: "Architecture",
        secondaryHref: "https://github.com/TolkmisLK/mcp-trace-lab/blob/main/docs/architecture.md",
        proof: [
          ["Built with", "TypeScript and Node.js"],
          ["Recording", "Forwards the original stream and saves JSONL traces locally"],
          ["Output", "Text or JSON summaries of calls, errors, and timing"],
          ["Scope", "stdio only; sensitive fields can be redacted by key name"],
        ],
      },
      {
        status: "Online",
        name: "NCC — Personal site",
        description: "My background and project links in one place. You can switch between English and Chinese, or choose a light or dark theme.",
        primaryAction: "Source code",
        primaryHref: "https://github.com/TolkmisLK/TolkmisLK.github.io",
        secondaryAction: "Setup instructions",
        secondaryHref: "https://github.com/TolkmisLK/TolkmisLK.github.io#readme",
        proof: [
          ["Built with", "Next.js and TypeScript"],
          ["Hosting", "Static pages deployed to GitHub Pages"],
        ],
      },
    ],
    contactLabel: "GitHub",
    contactTitle: "Find me on GitHub",
    contactCopy: "For project questions or bug reports, open an issue in the relevant repository.",
    contactAction: "GitHub profile",
    localeLabel: "切换为中文",
    theme: { system: "Theme: system", light: "Theme: light", dark: "Theme: dark" },
  },
  zh: {
    nav: [["开发经历", "experience"], ["技术栈", "focus"], ["项目", "work"], ["GitHub", "contact"]],
    role: "软件开发工程师 · 6 年开发经验",
    title: "NCC",
    subtitle: "全栈开发与 AI Agent",
    intro: "做过 Web 和移动端应用、企业管理与拍卖系统，以及医疗物联网集成。目前主要关注全栈开发，以及 AI Agent 相关工具。",
    explore: "查看项目",
    github: "GitHub",
    signalLabel: "项目概览",
    signals: [
      ["01", "Webhook 推送", "发送事件，重试失败请求，查看推送记录。"],
      ["02", "MCP 调试", "记录工具调用，排查错误和响应耗时。"],
      ["03", "个人网站", "整理开发经历和项目链接。"],
    ],
    experienceLabel: "开发经历",
    experienceTitle: "做过哪些项目",
    experiences: [
      ["Web 与移动端应用", "使用 Flutter 和 Vue 开发应用。"],
      ["企业管理系统", "支持企业日常业务的管理软件。"],
      ["拍卖软件", "面向企业的拍卖应用。"],
      ["医疗物联网", "医院设备相关的软件集成。"],
    ],
    focusLabel: "技术栈",
    focusTitle: "使用的技术",
    focus: [
      ["前端", "Web 界面和移动端应用开发。", ["TypeScript", "React", "Vue", "Flutter"]],
      ["后端", "API、应用服务和系统集成。", ["Node.js", "Python", "Java", "Spring"]],
      ["AI 工具", "大模型接入、工具调用和 MCP 调试。", ["AI Agents", "MCP", "Tool Calling", "LLM Integration"]],
    ],
    workLabel: "项目",
    workTitle: "代码与文档",
    projects: [
      {
        status: "v1.0.0",
        name: "可靠 Webhook 推送平台",
        description: "将事件推送到 HTTP 接口，失败后自动重试。可以在网页控制台管理接收地址、查看每次请求的结果，并手动重新推送。",
        primaryAction: "查看代码",
        primaryHref: "https://github.com/TolkmisLK/webhook-delivery-platform",
        secondaryAction: "架构说明",
        secondaryHref: "https://github.com/TolkmisLK/webhook-delivery-platform/blob/main/docs/architecture.md",
        proof: [
          ["技术栈", "Java、Spring Boot、PostgreSQL、React"],
          ["推送处理", "数据库队列、自动重试、HTTP 请求签名"],
          ["控制台", "接收地址设置、请求记录、任务取消和重新推送"],
          ["本地运行", "Docker Compose 附带可模拟请求失败的接收服务"],
        ],
      },
      {
        status: "v0.1.0 · 实验阶段",
        name: "MCP Trace Lab",
        description: "记录 MCP 客户端与 stdio 服务端之间的通信。通过命令行查看调用了哪些工具、哪些请求出错，以及响应花了多长时间。",
        primaryAction: "查看代码",
        primaryHref: "https://github.com/TolkmisLK/mcp-trace-lab",
        secondaryAction: "架构说明",
        secondaryHref: "https://github.com/TolkmisLK/mcp-trace-lab/blob/main/docs/architecture.md",
        proof: [
          ["技术栈", "TypeScript、Node.js"],
          ["记录方式", "转发原始通信流，在本地保存 JSONL 记录"],
          ["分析结果", "以文本或 JSON 输出调用、错误和耗时统计"],
          ["支持范围", "目前仅支持 stdio，可按字段名配置脱敏"],
        ],
      },
      {
        status: "已上线",
        name: "NCC 个人网站",
        description: "集中介绍开发经历和项目，支持中英文切换、浅色和深色主题。",
        primaryAction: "查看代码",
        primaryHref: "https://github.com/TolkmisLK/TolkmisLK.github.io",
        secondaryAction: "运行说明",
        secondaryHref: "https://github.com/TolkmisLK/TolkmisLK.github.io#readme",
        proof: [
          ["技术栈", "Next.js、TypeScript"],
          ["部署", "静态页面，托管在 GitHub Pages"],
        ],
      },
    ],
    contactLabel: "GitHub",
    contactTitle: "在 GitHub 找到我",
    contactCopy: "项目使用问题或 Bug，可以在对应仓库提交 Issue。",
    contactAction: "打开 GitHub 主页",
    localeLabel: "Switch to English",
    theme: { system: "主题：跟随系统", light: "主题：浅色", dark: "主题：深色" },
  },
} as const;

const themeOrder: Theme[] = ["system", "light", "dark"];

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("system");
  const content = copy[locale];

  useEffect(() => {
    const syncSavedPreferences = () => {
      const savedLocale = window.localStorage.getItem("ncc-locale");
      const savedTheme = window.localStorage.getItem("ncc-theme");

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

  const themeMark = useMemo(
    () => ({ system: "◐", light: "☼", dark: "☾" })[theme],
    [theme],
  );

  function toggleLocale() {
    const nextLocale: Locale = locale === "en" ? "zh" : "en";
    setLocale(nextLocale);
    window.localStorage.setItem("ncc-locale", nextLocale);
  }

  function cycleTheme() {
    const nextTheme =
      themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem("ncc-theme", nextTheme);
  }

  return (
    <div data-portfolio-root>
      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="brand" href="#top" aria-label="NCC home">
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
              {locale === "en" ? "中" : "EN"}
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

      <main id="top" className="site-shell">
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

          <aside
            className="signal-card"
            aria-label={locale === "en" ? "Project overview" : "项目概览"}
          >
            <div className="signal-card-header">
              <span>{content.signalLabel}</span>
            </div>
            <ol className="signal-list">
              {content.signals.map(([index, title, description]) => (
                <li key={index}>
                  <span className="signal-index">{index}</span>
                  <span>
                    <strong>{title}</strong>
                    <br />
                    {description}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section
          id="experience"
          className="section"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <p className="section-label">{content.experienceLabel}</p>
            <h2 id="experience-title">{content.experienceTitle}</h2>
          </div>
          <div className="experience-grid">
            {content.experiences.map(([title, description], index) => (
              <article className="experience-card" key={title}>
                <span className="card-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="focus" className="section" aria-labelledby="focus-title">
          <div className="section-heading">
            <p className="section-label">{content.focusLabel}</p>
            <h2 id="focus-title">{content.focusTitle}</h2>
          </div>
          <div className="focus-grid">
            {content.focus.map(([title, description, capabilities]) => (
              <article className="focus-card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="capability-list">
                  {capabilities.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="section-label">{content.workLabel}</p>
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
                <dl className="work-proof">
                  {project.proof.map(([label, value]) => (
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
          id="contact"
          className="section"
          aria-labelledby="contact-title"
        >
          <div className="contact-panel">
            <div>
              <p className="section-label">{content.contactLabel}</p>
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
            <a className="text-link" href="#top">
              ↑ Top
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
