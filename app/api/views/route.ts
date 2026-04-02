import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { articleSlug } = await request.json();
    if (!articleSlug) return NextResponse.json({ error: "Missing articleSlug" }, { status: 400 });

    const supabase = createServerClient();
    await supabase.rpc("increment_views", { slug: articleSlug }).maybeSingle();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true }); // Fire-and-forget, don't fail page load
  }
}
