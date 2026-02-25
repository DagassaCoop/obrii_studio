import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "Social", value: "social" },
          { title: "SMM", value: "smm" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroMedia",
      title: "Hero Media",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "vimeoUrl",
      title: "Vimeo URL",
      type: "url",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "problem",
      title: "Problem",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      subtitle: "category",
    },
  },
});
