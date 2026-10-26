import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface BrandLogoProps {
  locale: Locale;
  variant?: "header" | "footer";
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  locale,
  variant = "header",
  className,
}) => {
  return (
    <Link
      href={`/${locale}`}
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity hover:opacity-90",
        className
      )}
      aria-label="RKLT. ربوع الخير لنقل وشحن البضائع"
    >
      <div className="rklt-header-mark flex items-center gap-1">
        <span
          className={cn(
            "font-display font-extrabold tracking-tight leading-none text-sand-100",
            variant === "header" ? "text-2xl" : "text-3xl md:text-4xl"
          )}
        >
          RKLT
        </span>
        {/* Geometric terracotta chevron arrow */}
        <span
          className="inline-block w-0 h-0 border-solid border-y-[8px] border-y-transparent border-l-[14px] border-l-gold rtl:border-l-0 rtl:border-r-[14px] rtl:border-r-gold ml-1 rtl:ml-0 rtl:mr-1 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </div>

      {variant === "footer" ? (
        <div className="hidden sm:flex flex-col border-l border-sand-300/30 rtl:border-l-0 rtl:border-r rtl:border-sand-300/30 pl-3 rtl:pl-0 rtl:pr-3">
          <span className="font-arabic text-xs font-semibold text-sand-100/90 leading-tight">
            ربوع الخير
          </span>
          <span className="rklt-logo-sub font-arabic text-[10px] text-gold leading-tight">
            لنقل وشحن البضائع
          </span>
        </div>
      ) : null}
    </Link>
  );
};
