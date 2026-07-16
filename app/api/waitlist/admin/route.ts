import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(req: Request) {
  try {
    const { password } = (await req.json()) as Partial<{ password: string }>;
    const expected = process.env.WAITLIST_ADMIN_PASSWORD;

    if (!expected) {
      throw new Error("Missing WAITLIST_ADMIN_PASSWORD");
    }

    if (!password || password !== expected) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("waitlist")
      .select("email, first_name, last_name, help, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to load waitlist",
          detail: process.env.NODE_ENV === "production" ? undefined : error,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected error",
        detail: process.env.NODE_ENV === "production" ? undefined : String(err),
      },
      { status: 500 },
    );
  }
}
