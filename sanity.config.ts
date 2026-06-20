import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

const singletonTypes = new Set(["siteSettings", "seo"]);

export default defineConfig({
  name: "obrii-studio",
  title: "Obrii Studio",

  projectId: "kcffnd7i",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.listItem()
              .title("SEO")
              .id("seo")
              .child(S.document().schemaType("seo").documentId("seo")),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !singletonTypes.has(listItem.getId() as string),
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.has(schemaType),
      ),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              ["publish", "discardChanges", "restore"].includes(action),
          )
        : input,
  },
});
