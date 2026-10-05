import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  tone?: "terracotta" | "sand" | "blue";
  direction?: "up-right" | "right" | "down";
  external?: boolean;
  children: React.ReactNode;
}

export const ArrowLink: React.FC<ArrowLinkProps> = ({
  href,
  tone = "terracotta",
  direction = "up-right",
  external = false,
  className,
  children,
  ...props
}) => {
  const arrowChar =
    direction === "up-right" ? "↗" : direction === "right" ? "→" : "↓";

  const linkClass = cn(
    "group inline-flex items-center gap-1.5 font-sans font-semibold text-sm transition-all duration-200 border-b pb-0.5",
    tone === "terracotta" &&
      "text-terracotta-300 border-terracotta-500/40 hover:text-terracotta-400 hover:border-terracotta-400",
    tone === "sand" &&
      "text-sand-100 border-sand-300/40 hover:text-terracotta-300 hover:border-terracotta-300",
    tone === "blue" &&
      "text-brandblue-400 border-brandblue-400/40 hover:text-brandblue-500 hover:border-brandblue-500",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="rtl-flip inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
      >
        {arrowChar}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass} {...props}>
      {content}
    </Link>
  );
};
