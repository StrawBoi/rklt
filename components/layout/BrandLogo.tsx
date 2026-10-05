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
      aria-label="RKLT — ربوع الخير لنقل وشحن البضائع"
    >
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "font-display font-extrabold tracking-tight leading-none text-sand-100",
            variant === "header" ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
          )}
        >
          RKLT
        </span>
        {/* Geometric terracotta chevron arrow */}
        <span
          className="inline-block w-0 h-0 border-solid border-y-[8px] border-y-transparent border-l-[14px] border-l-terracotta-500 rtl:border-l-0 rtl:border-r-[14px] rtl:border-r-terracotta-500 ml-1 rtl:ml-0 rtl:mr-1 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      </div>

      <div className="hidden sm:flex flex-col border-l border-ink-700 rtl:border-l-0 rtl:border-r rtl:border-ink-700 pl-3 rtl:pl-0 rtl:pr-3">
        <span className="font-arabic text-xs font-semibold text-sand-100/90 leading-tight">
          ربوع الخير
        </span>
        <span className="font-arabic text-[10px] text-terracotta-300 leading-tight">
          لنقل وشحن البضائع
        </span>
      </div>
    </Link>
  );
};
