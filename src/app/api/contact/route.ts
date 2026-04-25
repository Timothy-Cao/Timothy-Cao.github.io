import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const FORM_ENDPOINT = "https://formspree.io/f/myzyavkz";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore =
  (globalThis as typeof globalThis & {
    __contactRateLimitStore?: Map<string, RateLimitEntry>;
  }).__contactRateLimitStore ??
  new Map<string, RateLimitEntry>();

(globalThis as typeof globalThis & {
  __contactRateLimitStore?: Map<string, RateLimitEntry>;
}).__contactRateLimitStore = rateLimitStore;

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return "unknown";
}

function isAllowedOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const host = req.headers.get("host");
    return host !== null && originUrl.host === host;
  } catch {
    return false;
  }
}

function validatePayload(payload: unknown): ContactPayload | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const { name, email, message, company } = payload as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    (company !== undefined && typeof company !== "string")
  ) {
    return null;
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    company: company?.trim() ?? "",
  };

  if (!trimmed.name || !trimmed.email || !trimmed.message) {
    return null;
  }

  if (
    trimmed.name.length > 120 ||
    trimmed.email.length > 320 ||
    trimmed.message.length > 5000 ||
    trimmed.company.length > 120
  ) {
    return null;
  }

  return trimmed;
}

function enforceRateLimit(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return null;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return Math.ceil((entry.resetAt - now) / 1000);
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return null;
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIp(req);
  const retryAfter = enforceRateLimit(ip);
  if (retryAfter !== null) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    );
  }

  let rawPayload: unknown;
  try {
    rawPayload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = validatePayload(rawPayload);
  if (!payload) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    const upstream = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Unable to send message right now" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send message right now" },
      { status: 502 }
    );
  }
}
