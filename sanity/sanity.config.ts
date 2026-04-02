import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "cryptic-daily",
  title: "Cryptic Daily",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Cryptic Daily")
          .items([
            // Articles
            S.listItem()
              .title("All Articles")
              .schemaType("article")
              .child(
                S.documentTypeList("article")
                  .title("All Articles")
                  .defaultOrdering([
                    { field: "publishedAt", direction: "desc" },
                  ]),
              ),

            // Featured only
            S.listItem()
              .title("⭐ Featured Article")
              .schemaType("article")
              .child(
                S.documentTypeList("article")
                  .title("Featured Articles")
                  .filter('_type == "article" && featured == true'),
              ),

            // noIndex warning list
            S.listItem()
              .title("🚫 noIndex Articles")
              .schemaType("article")
              .child(
                S.documentTypeList("article")
                  .title("Hidden from Google")
                  .filter('_type == "article" && noIndex == true'),
              ),

            S.divider(),

            S.listItem()
              .title("Authors")
              .schemaType("author")
              .child(S.documentTypeList("author").title("Authors")),

            S.listItem()
              .title("Categories")
              .schemaType("category")
              .child(S.documentTypeList("category").title("Categories")),

            S.listItem()
              .title("Tags")
              .schemaType("tag")
              .child(S.documentTypeList("tag").title("Tags")),
          ]),
    }),

    visionTool(), // GROQ query tester — remove in production if desired
  ],

  schema: { types: schemaTypes },
});
