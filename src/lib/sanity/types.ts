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
  vimeoUrl?: string;
  shortDescription?: string;
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
