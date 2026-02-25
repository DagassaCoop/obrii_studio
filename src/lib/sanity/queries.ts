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
    vimeoUrl,
    shortDescription,
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
