import { defineField, defineType } from "sanity";

const pageOverrideFields = [
  defineField({
    name: "title",
    title: "Title",
    type: "string",
  }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 2,
  }),
  defineField({
    name: "ogImage",
    title: "OG Image",
    type: "image",
    description: "Overrides the default OG image for this page (1200x630)",
  }),
];

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "document",
  groups: [
    { name: "defaults", title: "Defaults" },
    { name: "overrides", title: "Per-page Overrides" },
  ],
  fields: [
    defineField({
      name: "defaultTitle",
      title: "Default Title",
      type: "string",
      group: "defaults",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default Description",
      type: "text",
      rows: 2,
      group: "defaults",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
      group: "defaults",
      description: "Default social share image (1200x630)",
    }),
    defineField({
      name: "home",
      title: "Home Page",
      type: "object",
      group: "overrides",
      fields: pageOverrideFields,
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "portfolio",
      title: "Portfolio Page",
      type: "object",
      group: "overrides",
      fields: pageOverrideFields,
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: "contact",
      title: "Contact Page",
      type: "object",
      group: "overrides",
      fields: pageOverrideFields,
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "SEO" }),
  },
});
