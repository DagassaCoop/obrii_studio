export interface SanityImage {
  asset: {
    _ref: string;
  };
}

export interface SanityService {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  features?: string[];
  icon?: string;
  order?: number;
}

export interface SanityPricingPackage {
  _id: string;
  name: string;
  price: string;
  description?: string;
  features?: string[];
  popular?: boolean;
  order?: number;
}

export interface SanityProcessStep {
  _id: string;
  number: string;
  title: string;
  description: string;
  order?: number;
}

export interface SanityPortfolioStat {
  value: string;
  label: string;
}

export interface SanitySiteSettings {
  _id: string;
  heroOverline?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  manifestoTitle?: string;
  manifestoHeading?: string;
  manifestoText?: string;
  portfolioStats?: SanityPortfolioStat[];
  clientLogos?: SanityImage[];
  footerTagline?: string;
  contactEmail?: string;
}

export interface SanitySeoPageOverride {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

export interface SanitySeo {
  _id: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImage?: SanityImage;
  home?: SanitySeoPageOverride;
  portfolio?: SanitySeoPageOverride;
  contact?: SanitySeoPageOverride;
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: "video" | "social" | "smm";
  thumbnail?: {
    asset: {
      _ref: string;
    };
  };
  heroMedia?: {
    asset: {
      _ref: string;
    };
  };
  videoUrl?: string;
  shortDescription?: string;
  year?: number;
  fullDescription?: string;
  problem?: string;
  solution?: string;
  gallery?: Array<{
    asset: {
      _ref: string;
    };
  }>;
  featured?: boolean;
  order?: number;
  relatedProjects?: SanityProject[];
}
