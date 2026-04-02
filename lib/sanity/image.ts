import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: { asset?: { _ref?: string } } | string | null) {
  if (!source) return "";
  if (typeof source === "string") return source;
  return builder.image(source);
}
