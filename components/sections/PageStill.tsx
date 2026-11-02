import React from "react";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";

/**
 * Full-bleed atmospheric opening stage for inner pages.
 * Renders the custom Night and Day photographs across the full viewport width
 * with a calibrated architectural scrim that blends seamlessly into the page
 * surface below—eliminating the harsh 50/50 split box.
 */
export function PageStill({
  nightSrc,
  daySrc,
  alt,
  children,
}: {
  nightSrc: string;
  daySrc: string;
  alt: string;
  children: React.ReactNode;
}) {
  const night = fs.existsSync(path.join(process.cwd(), "public", nightSrc.replace(/^\//, "")));
  const day = fs.existsSync(path.join(process.cwd(), "public", daySrc.replace(/^\//, "")));

  return (
    <section
      className="rklt-page-hero relative overflow-hidden border-b border-white/10 [html[data-theme=day]_&]:border-black/10 bg-[#070b0f] [html[data-theme=day]_&]:bg-[#fbf9f4] pt-36 pb-20 md:pt-44 md:pb-28 transition-colors duration-300"
      data-night={night ? "true" : "false"}
      data-day={day ? "true" : "false"}
    >
      {/* Full-Bleed Custom Photography Stage */}
      {(night || day) && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {night ? (
            <Image
              src={nightSrc}
              alt={alt}
              fill
              priority
              sizes="100vw"
              className={
                day
                  ? "object-cover object-center opacity-50 scale-[1.01] [html[data-theme=day]_&]:hidden"
                  : "object-cover object-center opacity-50 scale-[1.01]"
              }
            />
          ) : null}
          {day ? (
            <Image
              src={daySrc}
              alt={alt}
              fill
              priority
              sizes="100vw"
              className="hidden object-cover object-center opacity-35 scale-[1.01] [html[data-theme=day]_&]:block"
            />
          ) : null}

          {/* Directional Vignette & Bottom Surface Weld Scrim (Zero Two-Background Split) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b0f]/95 via-[#070b0f]/75 to-[#070b0f]/45 [html[data-theme=day]_&]:from-[#fbf9f4]/95 [html[data-theme=day]_&]:via-[#fbf9f4]/82 [html[data-theme=day]_&]:to-[#fbf9f4]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b0f]/80 via-transparent to-[#070b0f] [html[data-theme=day]_&]:from-[#fbf9f4]/75 [html[data-theme=day]_&]:via-transparent [html[data-theme=day]_&]:to-[#fbf9f4]" />
        </div>
      )}

      <Container className="relative z-10">{children}</Container>
    </section>
  );
}
