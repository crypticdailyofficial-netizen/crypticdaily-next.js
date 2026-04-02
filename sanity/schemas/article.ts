import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "📝 Content", default: true },
    { name: "seo", title: "🔍 SEO" },
    { name: "settings", title: "⚙️  Settings" },
  ],
  fields: [
    // ── Content group ──────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description:
            "Describe the image — required for SEO and accessibility",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      description:
        "Short summary shown on article cards. Also used as meta description if SEO description is blank. Max 200 chars.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["https", "http", "mailto"],
                      }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  },
                  {
                    name: "nofollow",
                    type: "boolean",
                    title: "Add nofollow",
                    description: "Turn ON for affiliate or sponsored links",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sources",
      title: "Sources & References",
      type: "array",
      group: "content",
      of: [
        defineField({
          name: "source",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Source Name",
              type: "string",
              description: "e.g. CoinGecko, Reuters, Official Blog",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
      description: "Optional. Add sources cited in this article.",
    }),
    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "datetime",
      group: "content",
      description:
        "Update this whenever you edit article content — sends a freshness signal to Google. Critical for crypto news.",
    }),

    // ── SEO group ──────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Overrides title in search results. Max 60 chars.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "seo",
      rows: 2,
      description: "Overrides excerpt in search results. Max 160 chars.",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
      description:
        "Only set if this article was originally published on another site. Prevents duplicate content penalties.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines (noindex)",
      type: "boolean",
      group: "seo",
      initialValue: false,
      description:
        "Turn ON for thin content, drafts, or test articles. Tells Google not to index this page.",
    }),

    // ── Settings group ─────────────────────────────────────────
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description:
        "Shows this article in the homepage hero section. Only one article should be featured at a time.",
    }),
    defineField({
      name: "sponsored",
      title: "Sponsored / Affiliate Content",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description:
        'Required AdSense disclosure. Automatically adds a "Sponsored" label and nofollow to outbound links.',
    }),
    defineField({
      name: "contentWarning",
      title: "Content Warning",
      type: "string",
      group: "settings",
      description:
        'Optional — for regulatory or high-risk content (e.g. "Past performance is not indicative of future results"). Displayed as a disclaimer banner on the article.',
      placeholder: "This article discusses high-risk financial instruments...",
    }),
  ],

  // Studio card preview
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      category: "category.title",
      featured: "featured",
      noIndex: "noIndex",
    },
    prepare({ title, author, media, category, featured, noIndex }) {
      const flags = [featured ? "⭐ Featured" : "", noIndex ? "🚫 noIndex" : ""]
        .filter(Boolean)
        .join(" · ");

      return {
        title,
        subtitle: `${category ?? "Uncategorised"} · ${author ?? "Unknown"} ${flags ? `· ${flags}` : ""}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Publish Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Publish Date (Oldest)",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
