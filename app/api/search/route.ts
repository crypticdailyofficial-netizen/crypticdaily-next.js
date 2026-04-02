import { NextRequest, NextResponse } from "next/server";
import { mapSanityArticles } from "@/lib/sanity/adapters";
import { searchArticles } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

function buildSearchPattern(query: string) {
  return `${query
    .split(/\s+/)
    .filter(Boolean)
    .join("* ")}*`;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = mapSanityArticles(
    await searchArticles(buildSearchPattern(query)),
  );

  return NextResponse.json(
    { results },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
