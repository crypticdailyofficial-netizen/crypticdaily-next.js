import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
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
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description:
        "Used as meta description on category pages — keep under 160 chars",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "color",
      title: "Badge Color (hex)",
      type: "string",
      description:
        "DeFi=#7C3AED | NFTs=#EC4899 | Markets=#10B981 | Regulation=#F59E0B | Web3=#00D4FF | Bitcoin=#F7931A | Ethereum=#627EEA",
      placeholder: "#7C3AED",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description:
        "Title for category page — leave blank to auto-generate. Max 60 chars.",
      validation: (Rule) => Rule.max(60),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
