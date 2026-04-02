import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleSlug = searchParams.get("articleSlug");
  if (!articleSlug) return NextResponse.json({ error: "articleSlug required" }, { status: 400 });

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("article_slug", articleSlug)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articleSlug, content } = body;
    if (!articleSlug || !content?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("comments")
      .insert({
        article_slug: articleSlug,
        user_id: "anonymous",
        user_name: "Anonymous",
        content: content.trim(),
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
