import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const supabase = createServerClient();
    const { error } = await supabase.from("newsletter_subs").insert({ email });
    if (error?.code === "23505") {
      return NextResponse.json({ message: "Already subscribed!" });
    }
    if (error) throw error;
    return NextResponse.json({ message: "Subscribed successfully! 🎉" });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
