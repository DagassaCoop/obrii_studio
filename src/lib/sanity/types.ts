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
