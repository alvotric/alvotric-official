/**
 * Central site configuration. Change values here (or via environment variables),
 * never inside components.
 */

const env = (value: string | undefined): string => (value ?? "").trim();

export type FooterItem = { label: string; href?: string; note?: string };
export type FooterGroup = { title: string; links: FooterItem[] };

export type SocialLink = {
  label: string;
  url: string;
  /** Only links marked official are rendered. Confirm accounts before setting true. */
  official: boolean;
};

const siteUrlFromEnv = env(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = {
  name: "Alvotric",
  legalName: "Alvotric",
  tagline: "Intelligent software, built to be useful.",
  description:
    "Alvotric is an independent technology company building intelligent software, AI-powered development tools, and automation infrastructure.",

  /** Production origin. When unset, builds use a placeholder and robots.txt blocks indexing. */
  siteUrl: siteUrlFromEnv || "http://localhost:3000",
  siteUrlConfigured: siteUrlFromEnv.length > 0,

  /**
   * Business contact email. Leave empty until a real, monitored address exists.
   * When empty, /contact shows the "not available yet" state.
   */
  contactEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),

  /**
   * Social accounts. A link is clickable only when `url` is set AND `official` is true.
   * Until then the icon is shown as an inactive placeholder. Never put a guessed URL here.
   */
  social: [
    { label: "Instagram", url: "https://www.instagram.com/alvotric", official: true },
    { label: "X", url: "https://x.com/ALVOTRIC", official: true },
    { label: "GitHub", url: "", official: false },
  ] as SocialLink[],

  /** Alvo, the flagship product. */
  alvo: {
    name: "Alvo",
    /** Where "Visit Alvo" goes. Single place to change it. */
    url: env(process.env.NEXT_PUBLIC_ALVO_URL) || "https://alvo-automation.getvoroa.com",
    /**
     * Set to true only after the destination has been checked and confirmed.
     * Reachability was checked on 24 October 2026. When false or the URL is empty,
     * the button reads "Learn more" and points to the internal product page.
     */
    urlVerified: true,
    internalPath: "/products/alvo",
  },

  /** Alvo AI Chat — the conversational coding assistant. */
  alvoChat: {
    name: "Alvo AI Chat",
    /** Where "Try Alvo AI Chat" goes. Set via env for dashboard domain. */
    url: env(process.env.NEXT_PUBLIC_ALVO_CHAT_URL) || "",
    /**
     * Set to true only after the destination has been checked and confirmed.
     * When false or the URL is empty, the button reads "Coming soon" and is disabled.
     */
    urlVerified: false,
    internalPath: "/products/alvo",
  },

  /** Feature switches for content that is intentionally absent from version 1. */
  features: {
    showFounder: false,
    contactForm: false,
  },

  nav: [
    { label: "Products", href: "/products" },
    { label: "Technology", href: "/technology" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  /** Footer columns. An item without `href` is shown as inactive text with its `note`. */
  footerGroups: [
    {
      title: "Products",
      links: [
        { label: "Alvo", href: "/products/alvo" },
        { label: "Protodb", href: "/products/protodb" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Alvotric", href: "/about" },
        { label: "Technology", href: "/technology" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal & Security",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Report a security issue", note: "Soon" },
      ],
    },
    {
      title: "Join Us",
      links: [{ label: "Careers", note: "Not open yet" }],
    },
  ] as FooterGroup[],
} as const;

export function alvoLink(): { href: string; label: string; external: boolean } {
  const { url, urlVerified, internalPath } = siteConfig.alvo;
  if (url && urlVerified) {
    return { href: url, label: "Visit Alvo", external: true };
  }
  return { href: internalPath, label: "Learn more", external: false };
}

export function alvoChatLink(): { href: string; label: string; external: boolean; disabled: boolean } {
  const { url, urlVerified, internalPath } = siteConfig.alvoChat;
  if (url && urlVerified) {
    return { href: url, label: "Try Alvo AI Chat", external: true, disabled: false };
  }
  return { href: internalPath, label: "Coming soon", external: false, disabled: true };
}

export function officialSocialLinks(): SocialLink[] {
  return siteConfig.social.filter((s) => s.official && /^https:\/\//.test(s.url));
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.siteUrl).toString();
}
