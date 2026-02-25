import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/portfolio": {
      en: "/portfolio",
      fr: "/portfolio",
    },
    "/portfolio/[slug]": {
      en: "/portfolio/[slug]",
      fr: "/portfolio/[slug]",
    },
    "/contact": {
      en: "/contact",
      fr: "/contact",
    },
    "/instagram": {
      en: "/instagram",
      fr: "/instagram",
    },
  },
});
