import { groq } from "next-sanity";

// Get all projects, optionally filtered by category
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    thumbnail,
    shortDescription,
    featured,
    order
  }
`;

// Get a single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    thumbnail,
    heroMedia,
    videoUrl,
    shortDescription,
    year,
    fullDescription,
    problem,
    solution,
    gallery,
    relatedProjects[]-> {
      _id,
      title,
      slug,
      category,
      thumbnail,
      shortDescription
    }
  }
`;

// Get featured projects for the landing page
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    category,
    thumbnail,
    shortDescription
  }
`;

// Get all services for the landing page
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    features,
    icon,
    order
  }
`;

// Get all pricing packages for the landing page
export const pricingPackagesQuery = groq`
  *[_type == "pricingPackage"] | order(order asc) {
    _id,
    name,
    price,
    description,
    features,
    popular,
    order
  }
`;

// Get all process steps for the "How we work" section
export const processStepsQuery = groq`
  *[_type == "processStep"] | order(order asc) {
    _id,
    number,
    title,
    description,
    order
  }
`;

// Get the site settings singleton
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    heroOverline,
    heroHeadline,
    heroSubheadline,
    manifestoTitle,
    manifestoHeading,
    manifestoText,
    portfolioStats,
    clientLogos,
    footerTagline,
    contactEmail
  }
`;

// Get the SEO singleton
export const seoQuery = groq`
  *[_type == "seo"][0] {
    _id,
    defaultTitle,
    defaultDescription,
    ogImage,
    home,
    portfolio,
    contact
  }
`;
