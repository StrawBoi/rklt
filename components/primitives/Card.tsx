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
      "rklt-panel bg-role-panel border border-role-line text-role-text",
    surface === "darker" &&
      "rklt-panel bg-role-dock border border-role-line text-role-text",
    surface === "light" &&
      "bg-sand-100 border border-sand-300 text-ink-900",
    (interactive || href) && "cursor-pointer group",
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
