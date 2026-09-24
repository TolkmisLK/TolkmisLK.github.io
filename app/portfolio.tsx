"use client";

import { useEffect, useState } from "react";
import { site, defaultLocale, githubUrl, repositoryUrl } from "../lib/site";
import { StudioScene } from "./studio-scene";
import { DeliveryDemo } from "./delivery-demo";
import { AdbDemo, McpDemo, TransferDemo, ChatDemo } from "./project-demos";
import { StudioEffects, useMotionEnvironment } from "./studio-effects";
import "./studio.css";

type Locale = "en" | "zh";
type Theme = "system" | "light" | "dark";

const labels = {
  en: {
    nav: [
      ["Projects", "work"],
      ["Experience", "experience"],
      ["Technologies", "focus"],
      ["GitHub", "contact"],
    ],
    explore: "View projects",
    github: "GitHub",
    experienceTitle: "Experience",
    focusTitle: "Technologies",
    workTitle: "Projects",
    contactTitle: "Questions about a project?",
    contactCopy:
      "You can ask questions, report bugs, or suggest changes in the project’s GitHub issues.",
    contactAction: "GitHub profile",
    backToTop: "Back to top",
    siteSource: "Site source",
    skipLink: "Skip to content",
    localeLabel: "切换为中文",
    theme: {
      system: "Theme: system",
      light: "Theme: light",
      dark: "Theme: dark",
    },
    exploreExperience: "View experience",
    studio: "Welcome to my personal website",
    workNote: "A few projects I've been working on.",
    goodbye: "Thanks for visiting.",
    goodbyeNote: "Explore my projects and say hello to the cat.",
    motionOn: "Motion: on",
    motionOff: "Motion: off",
    motionReduced: "Motion reduced by your system preference",
  },
  zh: {
    nav: [
      ["项目", "work"],
      ["经历", "experience"],
      ["技术栈", "focus"],
      ["GitHub", "contact"],
    ],
    explore: "查看项目",
    github: "GitHub",
    experienceTitle: "开发经历",
    focusTitle: "技术栈",
    workTitle: "项目",
    contactTitle: "交流与反馈",
    contactCopy: "使用中遇到问题，或者有改进建议，可以在对应仓库提交 Issue。",
    contactAction: "打开 GitHub 主页",
    backToTop: "返回顶部",
    siteSource: "网站源码",
    skipLink: "跳转到正文",
    localeLabel: "Switch to English",
    theme: {
      system: "主题：跟随系统",
      light: "主题：浅色",
      dark: "主题：深色",
    },
    exploreExperience: "查看经历",
    studio: "欢迎来到我的个人网站",
    workNote: "这里记录了我做过的一些项目。",
    goodbye: "感谢你的来访。",
    goodbyeNote: "看看项目，也可以和小猫打个招呼。",
    motionOn: "动效：开",
    motionOff: "动效：关",
    motionReduced: "已遵循系统的减少动态效果设置",
  },
} as const;

const themeOrder: Theme[] = ["system", "light", "dark"];

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [theme, setTheme] = useState<Theme>("system");
  const [motionAllowed, setMotionAllowed] = useState(true);
  const { reduced, visible } = useMotionEnvironment();
  const motionEnabled = motionAllowed && !reduced && visible;
  const content = { ...labels[locale], ...site[locale] };
  const hasProjects = content.projects.length > 0;

  useEffect(() => {
    const syncSavedPreferences = () => {
      const savedLocale = readPreference("ncc-locale");
      const savedTheme = readPreference("ncc-theme");
      setMotionAllowed(readPreference("ncc-motion") !== "off");

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

  function toggleLamp() {
    const dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const nextTheme = dark ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    savePreference("ncc-theme", nextTheme);
  }

  function toggleMotion() {
    setMotionAllowed(!motionAllowed);
    savePreference("ncc-motion", motionAllowed ? "off" : "on");
  }

  return (
    <div data-portfolio-root>
      <StudioEffects enabled={motionEnabled} />
      <a className="skip-link" href="#top">
        {content.skipLink}
      </a>
      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="brand" href="#top" aria-label={site.identity.name}>
            {site.identity.name}
          </a>
          <nav
            className="nav"
            aria-label={locale === "en" ? "Primary navigation" : "主导航"}
          >
            {content.nav
              .filter(([, href]) => hasProjects || href !== "work")
              .map(([label, href]) => (
                <a key={href} href={`#${href}`}>
                  {label}
                </a>
              ))}
          </nav>
          <div className="header-actions">
            <button
              className="control-button motion-button"
              type="button"
              onClick={toggleMotion}
              aria-pressed={motionAllowed && !reduced}
              disabled={reduced}
              title={reduced ? content.motionReduced : undefined}
              aria-label={reduced ? content.motionReduced : undefined}
            >
              {motionAllowed && !reduced ? content.motionOn : content.motionOff}
            </button>
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
          <div className="hero-content">
            <p className="studio-welcome">{content.studio}</p>
            <p className="eyebrow">{content.role}</p>
            <h1 id="hero-title">
              {site.identity.name}
              <span>{content.subtitle}</span>
            </h1>
            <p className="hero-copy">{content.intro}</p>
            <div className="hero-actions">
              <a
                className="primary-link"
                href={hasProjects ? "#work" : "#experience"}
              >
                {hasProjects ? content.explore : content.exploreExperience}
              </a>
              <a
                className="secondary-link"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                {content.github} ↗
              </a>
            </div>
          </div>
          <StudioScene locale={locale} motionEnabled={motionEnabled} onToggleLamp={toggleLamp} />
        </section>

        {hasProjects && (
          <section id="work" className="section" aria-labelledby="work-title">
            <div className="section-heading">
              <div><p className="section-number">01 / PROJECTS</p><h2 id="work-title">{content.workTitle}</h2></div>
              <p className="section-note">{content.workNote}</p>
            </div>
            <div className="work-list">
              {content.projects.map((project) => (
                <article
                  className={
                    project.details.length
                      ? "work-card"
                      : "work-card work-card--summary"
                  }
                  key={project.name}
                >
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
                  {project.details.length > 0 && (
                    <dl className="project-details">
                      {project.details.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {new URL(project.primaryHref).pathname.replace(/\/$/, "") === "/TolkmisLK/webhook-delivery-platform" && (
                    <DeliveryDemo locale={locale} motionEnabled={motionEnabled} />
                  )}
                  {new URL(project.primaryHref).pathname.replace(/\/$/, "") === "/TolkmisLK/adb-device-desk" && (
                    <AdbDemo locale={locale} motionEnabled={motionEnabled} />
                  )}
                  {new URL(project.primaryHref).pathname.replace(/\/$/, "") === "/TolkmisLK/mcp-trace-lab" && (
                    <McpDemo locale={locale} motionEnabled={motionEnabled} />
                  )}
                  {new URL(project.primaryHref).pathname.replace(/\/$/, "") === "/TolkmisLK/Mutual_transfer" && (
                    <TransferDemo locale={locale} motionEnabled={motionEnabled} />
                  )}
                  {new URL(project.primaryHref).pathname.replace(/\/$/, "") === "/TolkmisLK/mutual_chat" && (
                    <ChatDemo locale={locale} motionEnabled={motionEnabled} />
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        <section
          id="experience"
          className="section experience-section"
          aria-labelledby="experience-title"
        >
          <div><p className="section-number">02 / EXPERIENCE</p><h2 id="experience-title">{content.experienceTitle}</h2></div>
          <p>{content.experienceCopy}</p>
        </section>

        <section id="focus" className="section" aria-labelledby="focus-title">
          <div className="section-heading">
            <div><p className="section-number">03 / TECHNOLOGIES</p><h2 id="focus-title">{content.focusTitle}</h2></div>
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
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              {content.contactAction} ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell studio-farewell">
          <p>{content.goodbye}</p>
          <span>{content.goodbyeNote}</span>
        </div>
        <div className="site-shell footer-inner">
          <span>
            © {new Date().getFullYear()} {site.identity.name}
          </span>
          <div className="footer-links">
            <a className="text-link" href={repositoryUrl}>
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
