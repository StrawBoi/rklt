import { NextResponse } from "next/server";

const MODES = ["sea", "air", "land", "customs"] as const;

const LIMITS = {
  name: 120,
  email: 160,
  phone: 60,
  company: 160,
  origin: 160,
  destination: 160,
  cargo: 800,
  notes: 1200,
} as const;

type NoteBody = {
  name: string;
  email: string;
  phone: string;
  company: string;
  origin: string;
  destination: string;
  cargo: string;
  notes: string;
  mode: (typeof MODES)[number];
  locale: "en" | "ar";
};

function field(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(email: string) {
  if (!email) return true; // allow optional if legacy payload, validated in UI as required
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parse(body: unknown): NoteBody | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const name = field(raw.name, LIMITS.name);
  const email = field(raw.email, LIMITS.email);
  const phone = field(raw.phone, LIMITS.phone);
  const company = field(raw.company, LIMITS.company);
  const origin = field(raw.origin, LIMITS.origin);
  const destination = field(raw.destination, LIMITS.destination);
  const cargo = field(raw.cargo, LIMITS.cargo);
  const notes = field(raw.notes, LIMITS.notes);
  const mode = raw.mode;
  const locale = raw.locale === "ar" ? "ar" : "en";

  if (!name || !origin || !destination || !cargo) return null;
  if (!isValidEmail(email)) return null;
  if (typeof mode !== "string" || !MODES.includes(mode as NoteBody["mode"])) return null;

  return {
    name,
    email,
    phone,
    company,
    origin,
    destination,
    cargo,
    notes,
    mode: mode as NoteBody["mode"],
    locale,
  };
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  const from = process.env.RESEND_FROM || "RKLT Operations Desk <onboarding@resend.dev>";
  const receiverRaw =
    process.env.CONTACT_RECEIVER_EMAIL ||
    process.env.RESEND_TO ||
    "operations@rklt.ltd";
  const toList = receiverRaw
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);

  const modeLabel: Record<NoteBody["mode"], string> = {
    sea: "Sea Freight (FCL / LCL)",
    air: "Air Cargo (QAIA / Global)",
    land: "Overland & Bonded Haulage",
    customs: "Customs Clearance (License #412)",
  };

  const refCode = `RKLT-${note.mode.toUpperCase()}-${Date.now().toString(36).slice(-5).toUpperCase()}`;

  const text = [
    `RKLT CONSIGNMENT & DISPATCH INQUIRY [${refCode}]`,
    `================================================`,
    `Contact Name: ${note.name}`,
    note.company ? `Company:      ${note.company}` : null,
    note.email ? `Email:        ${note.email}` : null,
    note.phone ? `Phone/WA:     ${note.phone}` : null,
    `------------------------------------------------`,
    `Mode:         ${modeLabel[note.mode]}`,
    `Origin:       ${note.origin}`,
    `Destination:  ${note.destination}`,
    `Cargo Specs:  ${note.cargo}`,
    note.notes ? `Manifest Notes:\n${note.notes}` : null,
    `------------------------------------------------`,
    `Locale:       ${note.locale.toUpperCase()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #070d12; color: #f3f1ec; border: 1px solid #1e2d36; padding: 32px;">
      <div style="border-bottom: 1px solid #1e2d36; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <div style="font-family: monospace; font-size: 11px; letter-spacing: 0.18em; color: #c89b3c; text-transform: uppercase;">
            RKLT OPERATIONS DESK · LICENSE #412
          </div>
          <h1 style="margin: 6px 0 0; font-size: 22px; font-weight: 800; color: #ffffff;">
            Consignment Dispatch Note
          </h1>
        </div>
        <div style="font-family: monospace; font-size: 12px; color: #c89b3c;">
          ${escapeHtml(refCode)}
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #8fa1ad; width: 36%; font-family: monospace; font-size: 12px; text-transform: uppercase;">Shipper / Contact</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #ffffff; font-weight: 600;">${escapeHtml(note.name)}${note.company ? ` — ${escapeHtml(note.company)}` : ""}</td>
        </tr>
        ${
          note.email
            ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #8fa1ad; font-family: monospace; font-size: 12px; text-transform: uppercase;">Reply Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #c89b3c;"><a href="mailto:${escapeHtml(note.email)}" style="color: #c89b3c; text-decoration: none;">${escapeHtml(note.email)}</a></td>
        </tr>`
            : ""
        }
        ${
          note.phone
            ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #8fa1ad; font-family: monospace; font-size: 12px; text-transform: uppercase;">Phone / WhatsApp</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #ffffff; font-family: monospace;">${escapeHtml(note.phone)}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #8fa1ad; font-family: monospace; font-size: 12px; text-transform: uppercase;">Transport Mode</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #c89b3c; font-weight: 700;">${escapeHtml(modeLabel[note.mode])}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #8fa1ad; font-family: monospace; font-size: 12px; text-transform: uppercase;">Origin Port / City</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #ffffff;">${escapeHtml(note.origin)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #8fa1ad; font-family: monospace; font-size: 12px; text-transform: uppercase;">Final Destination</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #ffffff;">${escapeHtml(note.destination)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #8fa1ad; font-family: monospace; font-size: 12px; text-transform: uppercase;">Cargo Classification</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #17232b; color: #ffffff;">${escapeHtml(note.cargo)}</td>
        </tr>
      </table>

      ${
        note.notes
          ? `<div style="background: #0d161d; border-left: 2px solid #c89b3c; padding: 14px 16px; margin-bottom: 20px;">
              <div style="font-family: monospace; font-size: 11px; color: #8fa1ad; text-transform: uppercase; margin-bottom: 6px;">Special Handling / Volume & Schedule Notes</div>
              <div style="font-size: 13px; line-height: 1.6; color: #e5e2dc; white-space: pre-wrap;">${escapeHtml(note.notes)}</div>
            </div>`
          : ""
      }

      <div style="font-family: monospace; font-size: 11px; color: #677985; padding-top: 12px; border-top: 1px solid #17232b;">
        Submitted via RKLT Operations Desk (${note.locale.toUpperCase()}) · Reply directly to this email to respond to ${escapeHtml(note.name)}.
      </div>
    </div>
  `;

  if (!key) {
    return NextResponse.json({ ok: false, error: "unconfigured", ref: refCode }, { status: 503 });
  }

  const payload: Record<string, unknown> = {
    from,
    to: toList,
    subject: `[${refCode}] ${modeLabel[note.mode]} — ${note.origin} to ${note.destination} (${note.name})`,
    text,
    html,
  };

  if (note.email) {
    payload.reply_to = note.email;
  }

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, ref: refCode });
}
