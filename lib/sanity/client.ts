import { createClient } from "next-sanity";

const token = process.env.SANITY_API_TOKEN;
const isPreview =
  process.env.NODE_ENV !== "production" && Boolean(token);

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: !isPreview,
  perspective: isPreview ? "drafts" : "published",
  token,
});
