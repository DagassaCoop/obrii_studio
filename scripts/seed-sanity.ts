/**
 * Seeds the Sanity `production` dataset with content currently hardcoded in
 * `src/messages/en.json` (services, pricing packages, process steps, and the
 * siteSettings / seo singletons).
 *
 * Idempotent: every document uses a deterministic `_id` and `createOrReplace`,
 * so re-running overwrites rather than duplicating.
 *
 * Usage: npm run seed:sanity
 * Requires SANITY_API_WRITE_TOKEN in .env.local (Editor/write access).
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.",
  );
}
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Add a write token to .env.local " +
      "(Sanity → Manage → API → Tokens, Editor permission).",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type Doc = Record<string, unknown> & { _id: string; _type: string };

const services: Doc[] = [
  {
    _id: "service-video",
    _type: "service",
    title: "Video Production",
    slug: { _type: "slug", current: "video" },
    description:
      "From concept to final cut. Commercial videos, brand films, product showcases, and event coverage that captivate your audience.",
    features: [
      "Brand & Commercial Films",
      "Product Showcases",
      "Event Coverage",
      "Motion Graphics",
    ],
    icon: "Video",
    order: 1,
  },
  {
    _id: "service-social",
    _type: "service",
    title: "Social Media Content",
    slug: { _type: "slug", current: "social" },
    description:
      "Scroll-stopping content engineered for engagement. Reels, stories, and posts designed to grow your digital presence.",
    features: [
      "Instagram Reels & Stories",
      "TikTok Content",
      "YouTube Shorts",
      "Content Calendars",
    ],
    icon: "Share2",
    order: 2,
  },
  {
    _id: "service-smm",
    _type: "service",
    title: "Social Media Management",
    slug: { _type: "slug", current: "smm" },
    description:
      "Full-cycle social media strategy. We plan, create, publish, and analyze — so you can focus on your business.",
    features: [
      "Strategy & Planning",
      "Community Management",
      "Analytics & Reporting",
      "Ad Campaign Support",
    ],
    icon: "TrendingUp",
    order: 3,
  },
];

const pricingPackages: Doc[] = [
  {
    _id: "pricingPackage-starter",
    _type: "pricingPackage",
    name: "Starter",
    price: "1,500",
    description: "Perfect for small businesses starting with video.",
    features: [
      "1 Video (up to 60 seconds)",
      "Basic color grading",
      "2 revision rounds",
      "Delivery in 7 days",
      "1 platform format",
    ],
    popular: false,
    order: 1,
  },
  {
    _id: "pricingPackage-professional",
    _type: "pricingPackage",
    name: "Professional",
    price: "3,500",
    description: "For brands ready to make an impact.",
    features: [
      "3 Videos (up to 90 seconds each)",
      "Professional color grading",
      "Sound design & music",
      "3 revision rounds",
      "Delivery in 14 days",
      "Multi-platform formats",
    ],
    popular: true,
    order: 2,
  },
  {
    _id: "pricingPackage-enterprise",
    _type: "pricingPackage",
    name: "Enterprise",
    price: "7,000",
    description: "Full-scale production for serious brands.",
    features: [
      "5+ Videos (custom length)",
      "Cinema-grade color grading",
      "Custom sound design & music",
      "Unlimited revisions",
      "Priority delivery",
      "All platform formats",
      "Social media content bundle",
    ],
    popular: false,
    order: 3,
  },
];

const processSteps: Doc[] = [
  {
    _id: "processStep-1",
    _type: "processStep",
    number: "1",
    title: "Briefing",
    description:
      "We listen. Understanding your goals, audience, and vision is the foundation of every great project.",
    order: 1,
  },
  {
    _id: "processStep-2",
    _type: "processStep",
    number: "2",
    title: "Production",
    description:
      "Cameras roll. Our team brings the creative vision to life with professional equipment and experienced direction.",
    order: 2,
  },
  {
    _id: "processStep-3",
    _type: "processStep",
    number: "3",
    title: "Post-Production",
    description:
      "The magic happens. Editing, color grading, sound design, and motion graphics transform raw footage into art.",
    order: 3,
  },
  {
    _id: "processStep-4",
    _type: "processStep",
    number: "4",
    title: "Delivery",
    description:
      "Launch ready. Final files optimized for every platform, with revisions until you're completely satisfied.",
    order: 4,
  },
];

const siteSettings: Doc = {
  _id: "siteSettings",
  _type: "siteSettings",
  heroOverline: "Creative Studio",
  heroHeadline: "We craft visual stories that resonate",
  heroSubheadline:
    "A boutique video production and social media agency dedicated to elevating brands through meticulous craftsmanship and timeless aesthetics.",
  manifestoTitle: "Our Philosophy",
  manifestoHeading: "The art is in the restraint",
  manifestoText:
    "Every brand has a story worth telling. We don't just produce content — we sculpt visual experiences that resonate, inspire, and convert. In a world drowning in noise, we create signal.",
  portfolioStats: [
    { _key: "projects", value: "50+", label: "Projects Delivered" },
    { _key: "industries", value: "12", label: "Industries Served" },
    { _key: "retention", value: "98%", label: "Client Retention" },
    { _key: "views", value: "4M+", label: "Views Generated" },
  ],
  footerTagline: "Crafting visual stories that move people.",
  contactEmail: "hello@obrii.studio",
};

const seo: Doc = {
  _id: "seo",
  _type: "seo",
  defaultTitle: "Obrii Studio — Video Production & Social Media Agency",
  defaultDescription:
    "We create stunning video content and social media strategies for businesses and individuals.",
};

async function seed() {
  const documents: Doc[] = [
    ...services,
    ...pricingPackages,
    ...processSteps,
    siteSettings,
    seo,
  ];

  console.log(
    `Seeding ${documents.length} documents into "${dataset}" (project ${projectId})...`,
  );

  const tx = documents.reduce(
    (transaction, doc) => transaction.createOrReplace(doc),
    client.transaction(),
  );

  await tx.commit();

  console.log(`✓ Seeded ${documents.length} documents:`);
  console.log(`  - ${services.length} services`);
  console.log(`  - ${pricingPackages.length} pricing packages`);
  console.log(`  - ${processSteps.length} process steps`);
  console.log(`  - siteSettings (singleton)`);
  console.log(`  - seo (singleton)`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
