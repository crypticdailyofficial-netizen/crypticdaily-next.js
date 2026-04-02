import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
      description:
        "Real photo strongly recommended — Google E-E-A-T values real author identity",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      placeholder: "e.g. Senior Crypto Analyst",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "string",
      description:
        'e.g. "CFA | 10 years in crypto markets" — shown under author name for E-E-A-T signals',
      placeholder: "CFA | 8 years covering DeFi & blockchain",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description:
        "Detailed bio improves E-E-A-T. Mention expertise, years of experience, publications.",
    }),
    defineField({
      name: "twitter",
      title: "Twitter / X URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "sameAs",
      title: "Identity Links",
      type: "array",
      of: [{ type: "url" }],
      description:
        "All public profiles proving author identity (Twitter, LinkedIn, personal site). Used in JSON-LD Person schema for Google.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "credentials",
      media: "avatar",
    },
  },
});
