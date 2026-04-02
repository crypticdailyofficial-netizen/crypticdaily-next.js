import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const isPreview =
  process.env.NODE_ENV !== "production" && Boolean(token);

export const hasSanityConfig = Boolean(projectId && dataset);

type SanityClientLike = ReturnType<typeof createClient>;

const fallbackSanityClient = {
  fetch: async <T>() => null as T,
  withConfig: () => fallbackSanityClient,
  config: () => ({
    projectId: "placeholder",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
    perspective: "published" as const,
    token: undefined,
  }),
} as unknown as SanityClientLike;

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: !isPreview,
      perspective: isPreview ? "drafts" : "published",
      token,
    })
  : fallbackSanityClient;
