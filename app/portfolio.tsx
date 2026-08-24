"use client";

import { useEffect, useMemo, useState } from "react";

type Locale = "en" | "zh";
type Theme = "system" | "light" | "dark";

const copy = {
  en: {
    nav: [
      ["Experience", "experience"],
      ["Focus", "focus"],
      ["Work", "work"],
      ["Principles", "principles"],
      ["Contact", "contact"],
    ],
    role: "Software Engineer · 6 years of experience",
    title: "NCC",
    subtitle: "Full-stack engineering. AI agent systems.",
    intro:
      "I build dependable software across cross-platform applications, enterprise management and auction systems, and healthcare IoT. My current focus is full-stack engineering and practical AI agent infrastructure.",
    explore: "Explore experience",
    github: "View GitHub",
    signalLabel: "engineering.signal",
    signals: [
      ["01", "Runnable", "Working software before decorative complexity."],
      ["02", "Clear", "Architecture and decisions that are easy to understand."],
      ["03", "Responsible", "Security and privacy treated as design inputs."],
    ],
    experienceLabel: "Experience",
    experienceTitle: "Six years across products, platforms, and connected systems.",
    experiences: [
      [
        "Cross-platform applications",
        "Flutter and Vue-based applications shaped around practical product workflows.",
      ],
      [
        "Enterprise platforms",
        "Management systems that support structured, day-to-day business operations.",
      ],
      [
        "Auction applications",
        "Enterprise auction software built for clear workflows and operational use.",
      ],
      [
        "Healthcare IoT",
        "Device-connected software used in hospital environments, with an emphasis on reliable integration.",
      ],
    ],
    focusLabel: "Current focus",
    focusTitle: "A pragmatic stack for end-to-end product delivery.",
    focus: [
      [
        "Product interfaces",
        "Responsive, accessible experiences across web and mobile.",
        ["TypeScript", "React", "Vue", "Flutter"],
      ],
      [
        "Backend systems",
        "Maintainable services, integrations, and operational workflows.",
        ["Node.js", "Python", "Java", "Spring"],
      ],
      [
        "AI engineering",
        "Reliable LLM integrations with explicit tools, boundaries, and evaluation.",
        ["AI Agents", "MCP", "Tool Calling", "LLM Integration"],
      ],
    ],
    workLabel: "Selected work",
    workTitle: "Public proof, presented with its engineering constraints.",
    projectStatus: "Public · Production",
    projectName: "NCC Engineering Portfolio",
    projectDescription:
      "The site you are viewing is the first public project in this profile: a deliberately scoped portfolio built as a bilingual, accessible static application with an automated delivery path.",
    projectLive: "Open live site",
    projectSource: "Review source",
    projectProof: [
      ["Architecture", "Next.js static export hosted on GitHub Pages"],
      ["Quality gate", "Lint, type-check, production build, and rendered HTML tests"],
      ["Product", "English and Chinese content with system-aware themes"],
      ["Boundary", "No backend, analytics, runtime secrets, or confidential project data"],
    ],
    principlesLabel: "Principles",
    principlesTitle:
      "Engineering quality is visible in the decisions, not the amount of machinery.",
    principles: [
      ["Make it run", "Deliver a coherent, reproducible path before expanding scope."],
      ["Make it clear", "Prefer understandable boundaries, naming, and documentation."],
      ["Make it testable", "Protect meaningful behavior with proportionate automated checks."],
      ["Make it responsible", "Treat failure modes, privacy, and security as first-class concerns."],
    ],
    contactLabel: "Contact",
    contactTitle: "Let’s build software that earns trust.",
    contactCopy:
      "Public projects will appear here as they become ready. For now, follow the work on GitHub.",
    contactAction: "Open GitHub profile",
    footer: "Built with deliberate scope and no invented project claims.",
    localeLabel: "切换为中文",
    theme: {
      system: "Theme: system",
      light: "Theme: light",
      dark: "Theme: dark",
    },
  },
  zh: {
    nav: [
      ["经验领域", "experience"],
      ["当前方向", "focus"],
      ["公开作品", "work"],
      ["工程原则", "principles"],
      ["联系", "contact"],
    ],
    role: "软件开发工程师 · 6 年开发经验",
    title: "NCC",
    subtitle: "全栈工程与 AI Agent 系统",
    intro:
      "我长期参与跨平台应用、企业管理与拍卖系统、医疗物联网软件的开发。目前专注于全栈工程，以及具备清晰边界和可靠性的 AI Agent 基础设施。",
    explore: "查看经验领域",
    github: "访问 GitHub",
    signalLabel: "engineering.signal",
    signals: [
      ["01", "可运行", "先交付真正可用的软件，再增加装饰性复杂度。"],
      ["02", "可理解", "让架构、边界和技术决策易于理解。"],
      ["03", "负责任", "把安全与隐私作为设计输入，而不是事后补充。"],
    ],
    experienceLabel: "经验领域",
    experienceTitle: "六年经验，覆盖产品、企业平台与设备连接系统。",
    experiences: [
      ["跨平台应用", "围绕真实产品流程开发 Flutter 与 Vue 应用。"],
      ["企业管理平台", "支持日常业务运转与结构化流程的企业管理系统。"],
      ["企业拍卖应用", "面向清晰业务流程与实际运营场景的企业级拍卖软件。"],
      ["医疗物联网", "应用于医院环境的设备连接软件，重视可靠集成。"],
    ],
    focusLabel: "当前方向",
    focusTitle: "用务实的技术组合完成端到端产品交付。",
    focus: [
      [
        "产品界面",
        "构建响应式、可访问的 Web 与移动端体验。",
        ["TypeScript", "React", "Vue", "Flutter"],
      ],
      [
        "后端系统",
        "构建可维护的服务、系统集成与运行流程。",
        ["Node.js", "Python", "Java", "Spring"],
      ],
      [
        "AI 工程",
        "构建工具、边界和评测清晰的可靠 LLM 集成。",
        ["AI Agents", "MCP", "Tool Calling", "LLM Integration"],
      ],
    ],
    workLabel: "公开作品",
    workTitle: "用可验证成果展示工程能力与约束。",
    projectStatus: "公开 · 已上线",
    projectName: "NCC 工程师主页",
    projectDescription:
      "你正在浏览的网站是这份公开技术履历的第一个项目：一个保持范围克制、支持中英双语和无障碍访问，并具备自动化交付流程的静态应用。",
    projectLive: "访问线上页面",
    projectSource: "审查源代码",
    projectProof: [
      ["架构", "使用 Next.js 静态导出并托管于 GitHub Pages"],
      ["质量门禁", "代码检查、类型检查、生产构建和渲染结果测试"],
      ["产品体验", "中英文内容与跟随系统的深浅主题"],
      ["系统边界", "不包含后端、分析服务、运行时密钥或保密项目数据"],
    ],
    principlesLabel: "工程原则",
    principlesTitle: "工程质量体现在判断中，而不是组件和工具的数量。",
    principles: [
      ["先让它运行", "先建立一致且可复现的运行路径，再扩展范围。"],
      ["再让它清晰", "优先选择可理解的边界、命名和文档。"],
      ["确保可测试", "使用与风险相匹配的自动化检查保护关键行为。"],
      ["保持负责任", "认真对待故障、安全和隐私问题。"],
    ],
    contactLabel: "联系",
    contactTitle: "一起构建值得信任的软件。",
    contactCopy:
      "公开项目准备完成后会在这里展示。目前可以先通过 GitHub 关注我的工作。",
    contactAction: "打开 GitHub 主页",
    footer: "保持克制，不使用虚构项目包装技术履历。",
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
              <a className="primary-link" href="#experience">
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
            aria-label={locale === "en" ? "Engineering signals" : "工程信号"}
          >
            <div className="signal-card-header">
              <span>{content.signalLabel}</span>
              <span className="status-dot" />
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
          <article className="work-card">
            <div className="work-summary">
              <p className="work-kicker">{content.projectStatus}</p>
              <h3>{content.projectName}</h3>
              <p>{content.projectDescription}</p>
              <div className="work-actions">
                <a
                  className="primary-link"
                  href="https://tolkmislk.github.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {content.projectLive} ↗
                </a>
                <a
                  className="secondary-link"
                  href="https://github.com/TolkmisLK/TolkmisLK.github.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  {content.projectSource} ↗
                </a>
              </div>
            </div>
            <dl className="work-proof">
              {content.projectProof.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </section>

        <section
          id="principles"
          className="section"
          aria-labelledby="principles-title"
        >
          <div className="section-heading">
            <p className="section-label">{content.principlesLabel}</p>
            <h2 id="principles-title">{content.principlesTitle}</h2>
          </div>
          <div className="principles-grid">
            {content.principles.map(([title, description]) => (
              <article className="principle" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
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
          <span>{content.footer}</span>
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
