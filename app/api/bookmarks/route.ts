import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json([], { status: 200 });

  try {
    const supabase = createServerClient();
    const { data } = await supabase.from("bookmarks").select("*").eq("user_id", userId);
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const { articleSlug, userId } = await request.json();
    if (!articleSlug || !userId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("bookmarks")
      .insert({ user_id: userId, article_slug: articleSlug })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add bookmark" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { articleSlug, userId } = await request.json();
    const supabase = createServerClient();
    await supabase.from("bookmarks").delete().eq("user_id", userId).eq("article_slug", articleSlug);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to remove bookmark" }, { status: 500 });
  }
}
