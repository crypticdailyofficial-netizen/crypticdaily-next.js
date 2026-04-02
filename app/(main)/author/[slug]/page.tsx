import { sanityClient } from "@/lib/sanity/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { calculateReadingTime } from "@/lib/utils";
import ArticleCard from "@/components/article/ArticleCard";
import {
  ALL_AUTHOR_SLUGS_QUERY,
  AUTHOR_BY_SLUG_QUERY,
  ARTICLES_BY_AUTHOR_QUERY,
} from "@/lib/sanity/queries";

export const revalidate = 3600;

type AuthorPageParams = {
  slug: string;
};

type SanityAuthor = {
  name?: string;
  slug?: string;
  avatar?: unknown;
  bio?: string;
  role?: string;
  twitter?: string;
};

type SanityAuthorArticle = {
  title?: string;
  slug?: string;
  coverImage?: unknown;
  excerpt?: string;
  bodyText?: string;
  publishedAt?: string;
  category?: {
    title?: string;
    slug?: string;
    color?: string;
  };
  author?: {
    name?: string;
    slug?: string;
    avatar?: unknown;
  };
};

function getInitials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "CD"
  );
}

function toTwitterHandle(value?: string) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const url = new URL(trimmed);
      const handle = url.pathname.replace(/^\/+/, "").split("/")[0];
      return handle || null;
    } catch {
      return null;
    }
  }

  return trimmed.replace(/^@/, "");
}

function mapAuthorArticles(articles: SanityAuthorArticle[] = []) {
  return articles.flatMap((article) => {
    if (!article.title || !article.slug) {
      return [];
    }

    return [
      {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt ?? "",
        coverImage: article.coverImage
          ? urlFor(article.coverImage).width(1200).height(675).url()
          : null,
        coverImageAlt: article.title,
        category: {
          title: article.category?.title ?? "Uncategorized",
          slug: article.category?.slug ?? "uncategorized",
          color: article.category?.color ?? "#00D4FF",
        },
        author: {
          name: article.author?.name ?? "Cryptic Daily",
          slug: article.author?.slug ?? "",
          avatar: article.author?.avatar
            ? urlFor(article.author.avatar).width(120).height(120).url()
            : null,
        },
        publishedAt: article.publishedAt ?? new Date(0).toISOString(),
        readingTime: calculateReadingTime(
          `${article.excerpt ?? ""} ${article.bodyText ?? ""}`.trim() ||
            article.title,
        ),
      },
    ];
  });
}

export async function generateStaticParams() {
  const authors =
    (await sanityClient.fetch<Array<{ slug: string }>>(ALL_AUTHOR_SLUGS_QUERY)) ??
    [];
  return authors.map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<AuthorPageParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const author = await sanityClient.fetch<SanityAuthor | null>(
    AUTHOR_BY_SLUG_QUERY,
    { slug },
  );
  if (!author) return {};
  const description =
    author.bio?.slice(0, 155) ?? `Articles by ${author.name} on Cryptic Daily.`;
  return {
    title: author.name,
    description,
    alternates: { canonical: `https://crypticdaily.com/author/${author.slug}` },
    openGraph: {
      title: `${author.name} | Cryptic Daily`,
      description,
      url: `https://crypticdaily.com/author/${author.slug}`,
      images: author.avatar
        ? [{ url: urlFor(author.avatar).width(1200).height(630).url() }]
        : [{ url: "https://crypticdaily.com/og-default.png" }],
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<AuthorPageParams>;
}) {
  const { slug } = await params;

  const [author, articlesData] = await Promise.all([
    sanityClient.fetch<SanityAuthor | null>(AUTHOR_BY_SLUG_QUERY, {
      slug,
    }),
    sanityClient.fetch<SanityAuthorArticle[] | null>(ARTICLES_BY_AUTHOR_QUERY, {
      slug,
    }),
  ]);

  if (!author) {
    notFound();
  }

  const articles = mapAuthorArticles(articlesData ?? []);
  const articleCount = articles.length;
  const avatarUrl = author.avatar
    ? urlFor(author.avatar).width(240).height(240).fit("crop").url()
    : null;
  const twitterHandle = toTwitterHandle(author.twitter);
  const twitterUrl = twitterHandle
    ? `https://twitter.com/${twitterHandle}`
    : null;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `https://crypticdaily.com/author/${author.slug}`,
    ...(author.avatar ? { image: urlFor(author.avatar).url() } : {}),
    jobTitle: author.role,
    description: author.bio,
    ...(twitterUrl ? { sameAs: [twitterUrl] } : {}),
    worksFor: {
      "@type": "Organization",
      name: "Cryptic Daily",
      url: "https://crypticdaily.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(10,15,30,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="relative overflow-hidden px-6 py-10 sm:px-8 md:px-10 md:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.16),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.10),transparent_24%)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full border border-cyan-500/20 bg-cyan-500/10 shadow-[0_0_0_6px_rgba(0,212,255,0.06)]">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={author.name ?? "Author"}
                    fill
                    className="object-cover"
                    sizes="120px"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-cyan-500 text-3xl font-bold text-white">
                    {getInitials(author.name ?? "Cryptic Daily")}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {author.name}
                    </h1>
                    {author.role ? (
                      <div className="mt-3">
                        <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
                          {author.role}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <p className="text-sm text-gray-400">
                    {articleCount} {articleCount === 1 ? "article" : "articles"} published
                  </p>
                </div>

                {author.bio ? (
                  <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">
                    {author.bio}
                  </p>
                ) : null}

                {twitterHandle && twitterUrl ? (
                  <div className="mt-5">
                    <Link
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>@{twitterHandle}</span>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-8 h-px w-full bg-white/10" />

        <section className="mt-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">
              Articles by {author.name}
            </h2>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center text-gray-400">
              No articles published yet.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
