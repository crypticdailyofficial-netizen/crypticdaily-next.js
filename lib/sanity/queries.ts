export const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  featured,
  readingTime,
  "category": category->{ title, slug, color },
  "author": author->{ name, slug, avatar },
  "tags": tags[]->{ title, slug }
}`;

export const featuredArticleQuery = `*[_type == "article" && featured == true] | order(publishedAt desc)[0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  body,
  "category": category->{ title, slug, color },
  "author": author->{ name, slug, avatar, bio, twitter, role },
  "tags": tags[]->{ title, slug }
}`;

export const articlesBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  body,
  seoTitle,
  seoDescription,
  "category": category->{ title, slug, color },
  "author": author->{ name, slug, avatar, bio, twitter, role },
  "tags": tags[]->{ title, slug }
}`;

export const articlesByCategoryQuery = `*[_type == "article" && category->slug.current == $category] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  "category": category->{ title, slug, color },
  "author": author->{ name, slug, avatar },
  "tags": tags[]->{ title, slug }
}`;

export const relatedArticlesQuery = `*[_type == "article" && category->slug.current == $category && slug.current != $slug] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  "category": category->{ title, slug, color },
  "author": author->{ name, slug, avatar }
}`;

export const allSlugsQuery = `*[_type == "article"] { "slug": slug.current }`;
