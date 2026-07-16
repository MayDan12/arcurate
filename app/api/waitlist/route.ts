import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import WaitlistEmail from "@/lib/emails/templates/waitlietemail";
import { sendEmail } from "@/lib/emails/send";

export const runtime = "nodejs";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
  }
  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY)",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<{
      firstName: string;
      lastName: string;
      email: string;
      help: string;
      country: string;
    }>;

    const firstName = body.firstName?.trim() ?? "";
    const lastName = body.lastName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const help = body.help?.trim() ?? "";
    const country = body.country?.trim() ?? "";

    if (!firstName || !lastName || !email || !help || !country) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseClient();

    const row = {
      first_name: firstName,
      last_name: lastName,
      email,
      help,
      country,
    };

    const { data: existing, error: findError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .limit(1);

    if (findError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to check existing waitlist entry",
          detail: process.env.NODE_ENV === "production" ? undefined : findError,
        },
        { status: 500 },
      );
    }

    const { error: writeError } =
      existing && existing.length > 0
        ? await supabase.from("waitlist").update(row).eq("email", email)
        : await supabase.from("waitlist").insert(row);

    if (writeError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to save waitlist entry",
          detail:
            process.env.NODE_ENV === "production" ? undefined : writeError,
        },
        { status: 500 },
      );
    }

    const now = new Date();
    const date = now.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const time = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

    await sendEmail({
      to: email,
      subject: "You're on the Arcurate waitlist",
      react: WaitlistEmail({ name: firstName, date, time }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 },
    );
  }
}
