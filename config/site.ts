export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "HIOPS",
  description:
    "The Humanitarian Intelligence & Operations System - Strengthening Nigeria's Social Protection Systems.",
  mainNav: [
    {
      title: "Intelligence",
      href: "/intelligence",
    },
    {
      title: "Registry",
      href: "/registry",
    },
    {
      title: "Pathways",
      href: "/programs",
    },
    {
      title: "FieldLink",
      href: "/fieldlink",
    },
  ],
  links: {
    github: "https://github.com/hiop-platform",
    docs: "https://fmhds.gov.ng/about-fmhds/",
    twitter: "https://twitter.com/fmhds_ng",
    linkedin: "https://linkedin.com/company/fmhds-nigeria",
  },
}
