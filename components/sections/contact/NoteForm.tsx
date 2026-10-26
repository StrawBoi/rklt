"use client";

import React, { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";

const MODES = [
  { id: "sea", en: "Sea", ar: "بحري" },
  { id: "air", en: "Air", ar: "جوي" },
  { id: "land", en: "Land", ar: "بري" },
  { id: "customs", en: "Customs", ar: "تخليص" },
] as const;

const copy = {
  en: {
    eyebrow: "A short note",
    title: "Send the desk the shipment.",
    name: "Name",
    origin: "Origin",
    destination: "Destination",
    cargo: "Cargo",
    mode: "Mode",
    send: "Send the note",
    sending: "Sending",
    done: "The desk has the note.",
    fail: "The note could not be sent. Use WhatsApp.",
  },
  ar: {
    eyebrow: "رسالة قصيرة",
    title: "أرسلوا تفاصيل الشحنة إلى المكتب.",
    name: "الاسم",
    origin: "المنشأ",
    destination: "الوجهة",
    cargo: "البضاعة",
    mode: "الواسطة",
    send: "أرسلوا الرسالة",
    sending: "جارٍ الإرسال",
    done: "وصلت الرسالة إلى المكتب.",
    fail: "تعذر إرسال الرسالة. استخدموا واتساب.",
  },
} as const;

export function NoteForm({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "fail">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const response = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          origin: data.get("origin"),
          destination: data.get("destination"),
          cargo: data.get("cargo"),
          mode: data.get("mode"),
          locale,
        }),
      });
      setStatus(response.ok ? "done" : "fail");
    } catch {
      setStatus("fail");
    }
  }

  const field =
    "w-full border-0 border-b border-role-line bg-transparent py-3 text-role-text outline-none placeholder:text-role-muted";

  return (
    <section className="border-b border-role-line bg-role-field py-16 md:py-24">
      <Container size="narrow">
        <Eyebrow tone="terracotta" className="mb-3 text-role-muted">
          {text.eyebrow}
        </Eyebrow>
        <h2 className="mb-10 font-display text-3xl font-extrabold text-role-text md:text-4xl">
          {text.title}
        </h2>
        {status === "done" ? (
          <p className="text-lg text-role-text">{text.done}</p>
        ) : (
          <form className="grid gap-6" onSubmit={onSubmit}>
            <label className="grid gap-1 text-sm text-role-muted">
              {text.name}
              <input className={field} name="name" required maxLength={120} autoComplete="name" />
            </label>
            <label className="grid gap-1 text-sm text-role-muted">
              {text.origin}
              <input className={field} name="origin" required maxLength={160} />
            </label>
            <label className="grid gap-1 text-sm text-role-muted">
              {text.destination}
              <input className={field} name="destination" required maxLength={160} />
            </label>
            <label className="grid gap-1 text-sm text-role-muted">
              {text.cargo}
              <textarea className={field} name="cargo" required maxLength={800} rows={3} />
            </label>
            <label className="grid gap-1 text-sm text-role-muted">
              {text.mode}
              <select className={field} name="mode" required defaultValue="sea">
                {MODES.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {locale === "ar" ? mode.ar : mode.en}
                  </option>
                ))}
              </select>
            </label>
            <div className="pt-2">
              <Button type="submit" variant="primary" size="sm" disabled={status === "sending"}>
                {status === "sending" ? text.sending : text.send}
              </Button>
            </div>
            {status === "fail" ? <p className="text-sm text-role-muted">{text.fail}</p> : null}
          </form>
        )}
      </Container>
    </section>
  );
}
