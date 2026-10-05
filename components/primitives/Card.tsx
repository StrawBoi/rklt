import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  surface?: "dark" | "darker" | "light";
  interactive?: boolean;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  as: Component = "div",
  surface = "dark",
  interactive = false,
  href,
  external = false,
  className,
  children,
  ...props
}) => {
  const cardStyles = cn(
    "relative rounded-md p-6 md:p-8 transition-all duration-300",
    surface === "dark" &&
      "bg-ink-800/90 border border-ink-700/80 text-sand-100",
    surface === "darker" &&
      "bg-ink-950/90 border border-ink-700 text-sand-100",
    surface === "light" &&
      "bg-sand-100 border border-sand-300 text-ink-900",
    (interactive || href) &&
      "hover:-translate-y-1 hover:shadow-md hover:border-terracotta-500/50 cursor-pointer group",
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cardStyles}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cardStyles}>
        {children}
      </Link>
    );
  }

  return (
    <Component className={cardStyles} {...props}>
      {children}
    </Component>
  );
};
