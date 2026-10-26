import React from "react";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";

/**
 * One still for an inner page.
 * Night and day are separate files. A missing file for the current skin
 * leaves the title on the field. The photograph does not move.
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

  if (!night && !day) {
    return (
      <section className="border-b border-role-line bg-role-field pt-16 pb-14 md:pt-20 md:pb-16">
        <Container>{children}</Container>
      </section>
    );
  }

  return (
    <section
      className="rklt-page-hero border-b border-role-line bg-role-field"
      data-night={night ? "true" : "false"}
      data-day={day ? "true" : "false"}
    >
      <div className="rklt-page-frame">
        <div className="rklt-page-still">
          {night ? (
            <Image
              src={nightSrc}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={
                day
                  ? "object-cover object-center [html[data-theme=day]_&]:hidden"
                  : "object-cover object-center"
              }
            />
          ) : null}
          {day ? (
            <Image
              src={daySrc}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="hidden object-cover object-center [html[data-theme=day]_&]:block"
            />
          ) : null}
        </div>
        <div className="rklt-page-copy">
          <div className="rklt-page-scrim">
            <Container>
              <div className="rklt-page-copy-pad">{children}</div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
