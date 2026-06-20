import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "manifesto", title: "Manifesto" },
    { name: "portfolio", title: "Portfolio" },
    { name: "general", title: "General" },
  ],
  fields: [
    defineField({
      name: "heroOverline",
      title: "Hero Overline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "manifestoTitle",
      title: "Manifesto Title",
      type: "string",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoHeading",
      title: "Manifesto Heading",
      type: "string",
      group: "manifesto",
    }),
    defineField({
      name: "manifestoText",
      title: "Manifesto Text",
      type: "text",
      rows: 4,
      group: "manifesto",
    }),
    defineField({
      name: "portfolioStats",
      title: "Portfolio Stats",
      type: "array",
      group: "portfolio",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "clientLogos",
      title: "Client Logos",
      type: "array",
      group: "portfolio",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "general",
      validation: (Rule) =>
        Rule.email().error("Must be a valid email address"),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
