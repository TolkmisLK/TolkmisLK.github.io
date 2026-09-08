import rawSite from "../content/site.json";

type Project = {
  status: string;
  name: string;
  description: string;
  primaryAction: string;
  primaryHref: string;
  secondaryAction: string;
  secondaryHref: string;
  details: [string, string][];
};
type Profile = {
  role: string;
  subtitle: string;
  intro: string;
  experienceCopy: string;
  focus: [string, string[]][];
  projects: Project[];
};
type SiteConfig = {
  identity: {
    name: string;
    githubUsername: string;
    repositoryName: string;
    siteUrl: string;
    defaultLocale: string;
    favicon: string;
    socialImage: string;
  };
  en: Profile;
  zh: Profile;
};

// JSON is checked by scripts/validate-site.mjs before each production build.
export const site = rawSite as unknown as SiteConfig;

export const defaultLocale: "en" | "zh" =
  site.identity.defaultLocale === "zh" ? "zh" : "en";
export const githubUrl = `https://github.com/${site.identity.githubUsername}`;
export const repositoryUrl = `${githubUrl}/${site.identity.repositoryName}`;
export const siteUrl = site.identity.siteUrl.replace(/\/$/, "");
export const assetUrl = (path: string) => `${siteUrl}${path}`;
