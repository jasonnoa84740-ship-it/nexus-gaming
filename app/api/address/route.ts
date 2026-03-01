import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceKey) throw new Error("Missing env: SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

function getToken(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
}

export async function GET(req: Request) {
  try {
    const admin = supabaseAdmin();
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData.user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = userData.user.id;

    const { data, error } = await admin
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ address: data ?? null });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const admin = supabaseAdmin();
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData.user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = userData.user.id;
    const body = await req.json();

    const payload = {
      user_id: userId,
      label: "Principale", // 👈 AJOUT IMPORTANT
      full_name: String(body.full_name || "").trim(),
      phone: String(body.phone || "").trim() || null,
      line1: String(body.line1 || "").trim(),
      line2: String(body.line2 || "").trim() || null,
      city: String(body.city || "").trim(),
      postal_code: String(body.postal_code || "").trim(),
      country: String(body.country || "FR").trim(),
      is_default: true,
    };

    if (
      !payload.full_name ||
      !payload.line1 ||
      !payload.city ||
      !payload.postal_code ||
      !payload.country
    ) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const { data, error } = await admin
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, address: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}