import { NextResponse } from "next/server";
import {
  leadSchema,
  PROJECT_TYPES,
  TIMELINES,
  CONTACT_METHODS,
} from "@/lib/lead-schema";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * In-memory sliding window. Good enough to stop a script hammering the form on
 * a single instance; it is not a distributed limiter. If this ever needs to
 * hold across instances, move it to Upstash or Vercel KV.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Certains champs sont à corriger.", fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot filled: accept silently so the bot sees success and moves on,
  // but never forward it to the CRM.
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  const webhook = process.env.GHL_WEBHOOK_URL;

  if (!webhook) {
    // Fail loudly rather than pretending. The previous site's mailto: form
    // reported success unconditionally and leads disappeared.
    console.error("[lead] GHL_WEBHOOK_URL is not configured; lead was not delivered", {
      email: lead.email,
    });
    return NextResponse.json(
      {
        ok: false,
        error: `Le formulaire n’est pas encore relié. Écrivez-moi à ${SITE.email} ou téléphonez au ${SITE.phone}.`,
      },
      { status: 503 },
    );
  }

  const payload = {
    first_name: lead.firstName,
    last_name: lead.lastName,
    full_name: `${lead.firstName} ${lead.lastName}`,
    email: lead.email,
    phone: lead.phone,
    project_type: PROJECT_TYPES[lead.projectType],
    project_type_key: lead.projectType,
    timeline: TIMELINES[lead.timeline],
    timeline_key: lead.timeline,
    preferred_contact_method: CONTACT_METHODS[lead.contactMethod],
    message: lead.message || "",
    consent: true,
    consent_text:
      "J’accepte que Marie-Claude Fisette me contacte au sujet de ma demande de financement hypothécaire.",
    source: SITE.url,
    source_page: "/contact",
    tags: ["site-web", "hypotheque-residentielle", lead.projectType],
    submitted_at: new Date().toISOString(),
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[lead] webhook rejected", response.status, detail.slice(0, 500));
      return NextResponse.json(
        {
          ok: false,
          error: `Votre demande n’a pas pu être transmise. Téléphonez au ${SITE.phone} ou écrivez à ${SITE.email}.`,
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[lead] webhook unreachable", error);
    return NextResponse.json(
      {
        ok: false,
        error: `Votre demande n’a pas pu être transmise. Téléphonez au ${SITE.phone} ou écrivez à ${SITE.email}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
