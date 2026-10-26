import { NextResponse } from "next/server";

const MODES = ["sea", "air", "land", "customs"] as const;

const LIMITS = {
  name: 120,
  origin: 160,
  destination: 160,
  cargo: 800,
} as const;

type NoteBody = {
  name: string;
  origin: string;
  destination: string;
  cargo: string;
  mode: (typeof MODES)[number];
  locale: "en" | "ar";
};

function field(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function parse(body: unknown): NoteBody | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const name = field(raw.name, LIMITS.name);
  const origin = field(raw.origin, LIMITS.origin);
  const destination = field(raw.destination, LIMITS.destination);
  const cargo = field(raw.cargo, LIMITS.cargo);
  const mode = raw.mode;
  const locale = raw.locale === "ar" ? "ar" : "en";
  if (!name || !origin || !destination || !cargo) return null;
  if (typeof mode !== "string" || !MODES.includes(mode as NoteBody["mode"])) return null;
  return { name, origin, destination, cargo, mode: mode as NoteBody["mode"], locale };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const note = parse(body);
  if (!note) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) {
    return NextResponse.json({ ok: false, error: "unconfigured" }, { status: 503 });
  }

  const modeLabel: Record<NoteBody["mode"], string> = {
    sea: "Sea",
    air: "Air",
    land: "Land",
    customs: "Customs",
  };

  const text = [
    `Name: ${note.name}`,
    `Origin: ${note.origin}`,
    `Destination: ${note.destination}`,
    `Cargo: ${note.cargo}`,
    `Mode: ${modeLabel[note.mode]}`,
    `Language: ${note.locale}`,
  ].join("\n");

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: ["operations@rklt.ltd"],
      subject: `Cargo note from ${note.name}`,
      text,
    }),
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
