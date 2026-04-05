# AI Handoff: Cryptic Daily

Last updated: 2026-04-05

This document is the real working handoff for the project. The current [README.md](README.md) is still boilerplate and does not reflect the actual app.

## 1. Project Summary

Cryptic Daily is a Next.js App Router news site backed by Sanity CMS. It publishes crypto news, analysis, regulatory coverage, and fraud/exploit stories. The frontend is highly custom-styled with heavy Tailwind usage, custom editorial hero layouts, and CMS-driven article/category/author pages.

Core product behaviors:

- Homepage pulls a featured article, latest articles, category summaries, and a Sanity-backed total article count.
- News article pages are statically generated from Sanity slugs.
- Search is server-backed through a Next.js API route, not direct browser-to-Sanity calls.
- About page now pulls authors and latest articles from Sanity.
- Newsletter signup uses Supabase.
- Sanity Studio is embedded in the app under `/studio`.

## 2. Stack

- Framework: Next.js 16.1.6
- React: 19.2.3
- Styling: Tailwind CSS v4
- CMS: Sanity + `next-sanity`
- Rich text: Portable Text
- Database/service integration: Supabase only for newsletter signup
- Deployment: Vercel

Main package entry points are defined in [package.json](package.json).

## 3. Current Repo State

Git remote:

- `origin`: `https://github.com/crypticdailyofficial-netizen/crypticdaily-next.js.git`

Linked Vercel project:

- `projectId`: `prj_zuXPrlkmPKGlbWxmsO9bMDcDAEW6`
- `orgId`: `team_YWwjFSMWONGUQemMfuKL18yu`
- Source: [.vercel/project.json](.vercel/project.json)

Current uncommitted local files at the time of writing:

- `AI_HANDOFF.md`
- `inject-external-links.mjs`
- `remove-listed-articles-and-tags.mjs`
- `upload-clarity-act.mjs`

These are root-level maintenance scripts and are not yet committed.

## 4. High-Level File Map

Important directories:

- [`app`](app): App Router routes, APIs, sitemap, RSS feed, layout
- [`components`](components): article UI, layout, home sections, SEO helpers
- [`lib`](lib): constants, utilities, Sanity and Supabase integration
- [`sanity`](sanity): Studio config and document schemas
- [`scripts`](scripts): one small Sanity connectivity script
- root `.mjs` scripts: ad hoc editorial / CMS maintenance utilities

Key route files:

- [app/layout.tsx](app/layout.tsx): global layout, metadata, ticker, navbar, footer
- [app/page.tsx](app/page.tsx): homepage server data fetch
- [app/(main)/news/[slug]/page.tsx](app/(main)/news/[slug]/page.tsx): article detail page
- [app/(main)/search/page.tsx](app/(main)/search/page.tsx): search route wrapper
- [app/(main)/search/SearchClient.tsx](app/(main)/search/SearchClient.tsx): client search UI
- [app/(main)/about/page.tsx](app/(main)/about/page.tsx): About page with Sanity authors
- [app/feed/route.ts](app/feed/route.ts): RSS feed
- [app/api/search/route.ts](app/api/search/route.ts): server-backed search
- [app/api/newsletter/route.ts](app/api/newsletter/route.ts): newsletter signup
- [app/sitemap.ts](app/sitemap.ts): dynamic sitemap generation
- [app/(admin)/studio/[[...tool]]/page.tsx](app/(admin)/studio/[[...tool]]/page.tsx): embedded Sanity Studio

## 5. Runtime Architecture

### Layout

[app/layout.tsx](app/layout.tsx) wraps the site with:

- `PriceTicker`
- `Navbar`
- page content
- `Footer`

It also injects `Organization` and `WebSite` JSON-LD.

Important note:

- It uses Google fonts via `next/font/google` (`Inter` and `Space_Grotesk`).
- In some restricted local environments, `next build` can fail if fonts cannot be fetched.
- Vercel production builds have succeeded, but sandboxed/offline local builds may behave differently.

### Homepage

[app/page.tsx](app/page.tsx) fetches:

- featured article
- latest 24 articles
- all categories
- total article count

The count is Sanity-backed. The grid still renders a latest-24 slice, not the entire archive.

### Article Pages

[app/(main)/news/[slug]/page.tsx](app/(main)/news/[slug]/page.tsx):

- statically generates pages from Sanity article slugs
- renders Portable Text with inline links and images
- loads related articles by category
- loads sidebar latest articles
- injects `ArticleJsonLd` and breadcrumb schema

### Search

Search used to be browser-to-Sanity and broke on deployed environments. It is now server-backed:

- UI: [app/(main)/search/SearchClient.tsx](app/(main)/search/SearchClient.tsx)
- API: [app/api/search/route.ts](app/api/search/route.ts)

Search flow:

- Client reads `q` from the URL
- Client requests `/api/search?q=...`
- API uses `searchArticles()` from `lib/sanity/queries.ts`
- Results are returned as mapped article cards

Search page metadata is `noindex`.

### About Page

[app/(main)/about/page.tsx](app/(main)/about/page.tsx) now pulls:

- author list from Sanity
- latest articles from Sanity
- article count from slug list length
- category count from category array length

Operational note:

- This page is effectively static unless the route is redeployed or changed to revalidate more explicitly.
- If authors are changed in Sanity and the page does not update, redeploy first.

### RSS Feed

[app/feed/route.ts](app/feed/route.ts):

- uses `dynamic = "force-dynamic"`
- creates its own Sanity client instead of relying on the shared fallback client
- returns an empty feed instead of crashing if Sanity env vars are missing

This was done specifically to avoid Vercel build-time failures.

### Newsletter

[app/api/newsletter/route.ts](app/api/newsletter/route.ts):

- validates email shape
- inserts into Supabase `newsletter_subs`
- treats PostgreSQL unique violation `23505` as "Already subscribed!"

The route assumes a `newsletter_subs` table exists and that email uniqueness is enforced there.

## 6. Sanity Integration

### Core Files

- [lib/sanity/client.ts](lib/sanity/client.ts)
- [lib/sanity/queries.ts](lib/sanity/queries.ts)
- [lib/sanity/adapters.ts](lib/sanity/adapters.ts)
- [lib/sanity/image.ts](lib/sanity/image.ts)

### Important Behavior

[lib/sanity/client.ts](lib/sanity/client.ts) is intentionally defensive:

- if `NEXT_PUBLIC_SANITY_PROJECT_ID` or `NEXT_PUBLIC_SANITY_DATASET` is missing, it falls back to a fake client
- that fake client returns `null` on fetch
- result: the site builds without crashing, but pages render with empty content

This is useful operationally, but it also means "site is empty" is often an env-var problem, not a rendering bug.

Preview/draft behavior:

- if `NODE_ENV !== "production"` and `SANITY_API_TOKEN` exists, the client uses `perspective: "drafts"`
- in production it uses `published`

### Adapters

[lib/sanity/adapters.ts](lib/sanity/adapters.ts) maps raw Sanity records into frontend-safe shapes.

Relevant mapped concepts:

- articles
- authors
- categories

### Queries

[lib/sanity/queries.ts](lib/sanity/queries.ts) is the main CMS query hub.

Important query groups:

- homepage content
- article detail and related content
- category archives
- author pages
- search
- RSS data
- sitemap slug queries

## 7. Sanity Content Model

### Article

Defined in [sanity/schemas/article.ts](sanity/schemas/article.ts).

Important fields:

- `title`
- `slug`
- `author` reference
- `coverImage`
- `category` reference
- `tags` array of references
- `excerpt`
- `body` Portable Text
- `publishedAt`
- `sources`
- `updatedAt`
- `seoTitle`
- `seoDescription`
- `canonicalUrl`
- `noIndex`
- `featured`
- `sponsored`
- `contentWarning`

Portable Text supports:

- normal text
- `h2`, `h3`, `h4`
- blockquote
- inline link annotations
- inline images with alt/caption

### Author

Defined in [sanity/schemas/author.ts](sanity/schemas/author.ts).

Important fields:

- `name`
- `slug`
- `avatar`
- `role`
- `credentials`
- `bio`
- `twitter`
- `linkedin`
- `sameAs`

### Category

Defined in [sanity/schemas/category.ts](sanity/schemas/category.ts).

Important fields:

- `title`
- `slug`
- `description`
- `color`
- `seoTitle`

### Tag

Defined in [sanity/schemas/tag.ts](sanity/schemas/tag.ts).

Important fields:

- `title`
- `slug`
- `description`

## 8. Sanity Studio

Studio config lives in [sanity/sanity.config.ts](sanity/sanity.config.ts).

It:

- uses `NEXT_PUBLIC_SANITY_PROJECT_ID`
- uses `NEXT_PUBLIC_SANITY_DATASET`
- exposes lists for Articles, Featured Articles, noIndex Articles, Authors, Categories, and Tags
- includes `visionTool`

Studio route:

- [app/(admin)/studio/[[...tool]]/page.tsx](app/(admin)/studio/[[...tool]]/page.tsx)

Important fix already in place:

- the Studio route is a client component using `NextStudio` directly
- this avoids the old `next/dynamic` + `ssr: false` App Router build error on Vercel

## 9. Environment Variables

Main env vars used in this project:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes for content | Sanity project id for frontend and Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes for content | Sanity dataset |
| `SANITY_API_TOKEN` | Optional for published reads, needed for scripts/drafts/private access | Authenticated Sanity access |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical/base site URL |
| `NEXT_PUBLIC_SITE_NAME` | Optional | Site name override |
| `NEXT_PUBLIC_SUPABASE_URL` | Required for newsletter | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Preferred for server route | Newsletter insert access |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Fallback | Used if service role key is missing |

Operational notes:

- Vercel must have Sanity env vars in both `Production` and `Preview` if you want both environments to show content.
- If preview envs are missing, preview deployments render empty content because of the fallback Sanity client.

## 10. Deployment Notes

Current deployment platform is Vercel.

Known deployment characteristics:

- `main` is used for production pushes
- the app has been successfully deployed with search, feed, and sitemap
- the linked project is defined in `.vercel/project.json`

Custom domain:

- The site has been deployed to `www.crypticdaily.com` in recent operations

Potential domain/canonical mismatch:

- [lib/constants.ts](lib/constants.ts) defaults `SITE_URL` to `https://crypticdaily.com`
- if Vercel primary domain is `www.crypticdaily.com`, canonical URLs and metadata should eventually be aligned

Useful deploy command:

```bash
npx vercel deploy --prod --yes
```

Useful verification commands:

```bash
./node_modules/.bin/tsc --noEmit --pretty false
npm run build
```

## 11. Sitemap and Indexing Rules

[app/sitemap.ts](app/sitemap.ts) generates URLs for:

- static pages
- article pages
- category pages
- author pages

Category inclusion rule:

- only categories with `articleCount >= 3` are included

Search page:

- explicitly `noindex`

Feed:

- exposed at `/feed`

## 12. Supabase Usage

Currently, Supabase is only used for newsletter signup.

Relevant files:

- [lib/supabase/server.ts](lib/supabase/server.ts)
- [app/api/newsletter/route.ts](app/api/newsletter/route.ts)

Note:

- [lib/supabase/types.ts](lib/supabase/types.ts) still contains old bookmark/comment/article-view types
- those features were removed from the site, so this file is partially stale

## 13. Maintenance Scripts

### `upload-clarity-act.mjs`

Purpose:

- uploads a hardcoded CLARITY Act article document to Sanity

Status:

- currently untracked
- now loads `.env.local`
- supports `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN`

Important caveat:

- category, author, and tag `_ref` values in the document are hardcoded placeholders and may need manual adjustment before use

### `remove-listed-articles-and-tags.mjs`

Purpose:

- deletes a hardcoded list of article titles
- deletes tag documents only when those tags become orphaned after deletion

Status:

- currently untracked
- currently `DRY_RUN = true`

### `inject-external-links.mjs`

Purpose:

- despite the filename, it currently removes a specific set of previously injected external H2 links from one article

Status:

- currently untracked
- currently `DRY_RUN = false`

Important caveat:

- the filename no longer matches the current behavior
- rename it if this script will be kept long-term

### `scripts/test-sanity.ts`

Purpose:

- simple connectivity test for Sanity

Important caveat:

- it uses a hardcoded project id
- treat it as a scratch script, not production-safe tooling

## 14. Recent Functional Changes

These are the high-impact changes that define the current app behavior:

- Search was moved to `/api/search` so deployed search no longer depends on browser-to-Sanity access.
- About page authors and latest content are now Sanity-driven instead of placeholder-only.
- Public tag archive pages were removed; article body links to `/tags` are suppressed at render time.
- RSS feed was hardened to avoid build failures when Sanity env vars are missing.
- Studio route was corrected for App Router/Vercel compatibility.
- Old auth/comments/bookmarks/dashboard/market widgets were removed from the shipped app.

## 15. Known Issues and Sharp Edges

### Boilerplate README

- [README.md](README.md) is still default Next.js boilerplate.

### Duplicate Contact File

- [app/(main)/contact/page (1).tsx](app/(main)/contact/page%20(1).tsx) exists alongside the real contact route file.
- This looks like an accidental duplicate and should be removed.

### Stale Supabase Types

- [lib/supabase/types.ts](lib/supabase/types.ts) still mentions bookmarks/comments/views even though those features were removed.

### Domain Consistency

- Check whether the live primary domain is `crypticdaily.com` or `www.crypticdaily.com`.
- Then align `NEXT_PUBLIC_SITE_URL`, `SITE_URL`, canonical tags, and sitemap output.

### Local Font Fetching

- Restricted local environments can fail on Google font fetches during `next build`.
- This is environmental, not necessarily a project code issue.

### Security

- The `SANITY_API_TOKEN` was exposed during prior manual operations outside the repo.
- Rotate it if this has not already been done.
- Never commit secrets into any `.mjs` script or into git-tracked files.

## 16. Suggested Next Cleanup

- Replace the boilerplate `README.md` with a real project README or point it to this handoff.
- Delete `app/(main)/contact/page (1).tsx`.
- Rename `inject-external-links.mjs` to match what it currently does.
- Decide whether the root utility scripts should be committed or kept local-only.
- Remove stale bookmark/comment/view types from `lib/supabase/types.ts` if no longer needed.
- Align canonical domain configuration with the actual Vercel primary domain.
- Consider adding explicit revalidation strategy for About and other content pages that should update without redeploys.

## 17. Practical Debug Checklist

If production shows no articles:

- check `NEXT_PUBLIC_SANITY_PROJECT_ID`
- check `NEXT_PUBLIC_SANITY_DATASET`
- check whether the deployment is `Preview` vs `Production`
- remember the fallback Sanity client returns empty data rather than crashing

If search is broken:

- test `/api/search?q=bitcoin`
- inspect [app/api/search/route.ts](app/api/search/route.ts)
- inspect [lib/sanity/queries.ts](lib/sanity/queries.ts) search query

If newsletter signup is failing:

- check Supabase env vars
- verify `newsletter_subs` exists
- verify unique constraint on email if duplicate handling is expected

If Vercel build fails around Studio:

- check [app/(admin)/studio/[[...tool]]/page.tsx](app/(admin)/studio/[[...tool]]/page.tsx)
- do not reintroduce `next/dynamic(..., { ssr: false })` in a server component

If RSS or sitemap fails at build time:

- inspect [app/feed/route.ts](app/feed/route.ts)
- inspect [app/sitemap.ts](app/sitemap.ts)
- confirm Sanity env vars are present

## 18. Commands Worth Remembering

Local dev:

```bash
npm run dev
```

Typecheck:

```bash
./node_modules/.bin/tsc --noEmit --pretty false
```

Production build:

```bash
npm run build
```

Deploy:

```bash
npx vercel deploy --prod --yes
```

Sanity utility scripts:

```bash
node upload-clarity-act.mjs
node remove-listed-articles-and-tags.mjs
node inject-external-links.mjs
```

## 19. Bottom Line

The app is a Sanity-backed crypto news site with a fairly custom App Router frontend and a Vercel deployment workflow. The biggest things a future agent needs to know are:

- content issues are often env-var or publish-state issues, not rendering issues
- search is server-backed now and should stay that way
- tags still exist in Sanity and search logic, but there are no public tag archive routes
- root `.mjs` scripts are operational tools, not polished product code
- the repo still has some cleanup debt, but the shipped routes are working
