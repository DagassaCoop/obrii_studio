## Obrii Studio Project Specifications

🚀 Digital content creation studio

---

## Obrii Studio Project Specifications

🚀 **Digital content creation studio** with focus on video production for code clients interested in studio services.

---

## 📌 Problem (Core Idea)

People are looking for someone who can create modern video content for their product, platform or social media.

➡️ **Obrii Studio provides services in video creation and social media content management**

---

## ✨ Core Features

### A) Landing

Landing page with:

- Hero
- Services
- Projects
- How we work
- Prices
- Link to contact form

### B) Portfolio

Page with list of all projects studio has done.

- Grid with cards of projects
- Filtering system to find projects by their type of content

### C) Contact form

Contact form to leave client's personal details to let studio's staff contact them with focused proposition.

Data:

- Full name
- Email
- Company name (optional)
- Project type: Video Production, Social Media Content Creation, Social Media Account Management
- Budget Range
- Timeline
- Project Details (optional)

---

## 🗄️ Data Model (Rough TS Draft)

> This schema is a starting point and **will evolve**

```TS
interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: { current: string };
  category: "video" | "social" | "smm";
  featured?: boolean;
  order?: number;
  thumbnail?: SanityImage;
  heroMedia?: SanityImage;
  videoUrl?: string;
  shortDescription?: string;
  fullDescription?: string;
  problem?: string;
  solution?: string;
  gallery?: SanityImage[];
  relatedProjects?: { _ref: string; _type: "reference" }[];
}

interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface Service {
  title: string;
  description: string;
  features: string[];
}

type ServiceCategory = "video" | "social" | "smm";

interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}
```

---

## 🧱 Tech Stack

| Category      | Choice                       |
| ------------- | ---------------------------- |
| Framework     | **Next.js (React 19)**       |
| Language      | TypeScript                   |
| CMS           | Sanity                       |
| Video Storage | Vimeo/Youtube                |
| CSS/UI        | Tailwind CSS v4 + ShadCN     |
| Deployment    | Vercel                       |
| Monitoring    | Sentry (later)               |

---

## 💰 Monetization

This website isn't going to be monetized. It's lead generator platform.

---

## 🎨 UI / UX

- **Light mode only** (no dark mode)
- Warm, editorial aesthetic — inspired by **architectural studios, design agencies**
- Minimal, content-first layout with generous whitespace

### Color Palette

| Token | Hex | Role |
|---|---|---|
| Parchment | `#F5F0EC` | Primary background |
| Soft Sand | `#F7F5F1` | Secondary background, cards |
| Graphite | `#333333` | Primary text |
| Terracotta | `#B04F46` | Primary CTA, header, focus rings |
| Burnt Earth | `#8E3E37` | CTA hover state |
| Muted Silt | `#A69F98` | Overlines, labels, meta text only (WCAG: large text only) |
| Warm Mist | `#EDE8E3` | Card hover, icon backgrounds |
| White Smoke | `#F2F2F2` | Input surfaces |

### Typography

| Use | Font | Weight |
|---|---|---|
| Headings, display, overlines | **Josefin Slab** (serif) | 300–400 |
| Body, UI, buttons | **Plus Jakarta Sans** (sans-serif) | 200–800 |
| Code, technical values | **Geist Mono** | default |

- Display: `clamp(3.75rem, 8vw, 6.5rem)`, weight 300
- Fluid type scale via `clamp()` for responsive headings
- Overlines: uppercase, `letter-spacing: 0.12em`, Silt color

### Layout

- Fixed terracotta header (60px) with centered nav
- Full-width sections alternating Parchment/Sand backgrounds
- Content max-width: `max-w-7xl` (sections), `max-w-5xl` (hero)
- Generous vertical rhythm: `py-32` between sections

### Components

- **Buttons**: pill-shaped (`rounded-full`), Terracotta primary / ghost secondary with subtle border
- **Cards**: Shadcn Card with border-terracotta, hover shadow effect
- **Icons**: Lucide, 20px, `strokeWidth: 1.5`, placed in Warm Mist circles
- **Borders**: "Blueprint" style — Silt at 20% opacity

### Radius Scale

| Token | Size | Use |
|---|---|---|
| xs | 4px | Badges, tags |
| sm | 8px | Inputs, chips |
| md | 14px | Cards, panels |
| lg | 20px | Modals, drawers |
| pill | 9999px | Buttons, avatars |

### Responsive

- Mobile drawer (Sheet) for navigation
- Locale switcher (EN/FR) in header
- Fluid typography, no fixed breakpoint jumps for text