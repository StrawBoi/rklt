import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  href?: string;
  variant?: "primary" | "outline" | "ghost" | "ember";
  surface?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  variant = "primary",
  surface = "dark",
  size = "md",
  icon,
  iconPosition = "right",
  external = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-sans font-bold transition-all duration-300 select-none cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandblue-400 focus-visible:ring-offset-2",
    size === "sm" && "text-xs px-3.5 py-2 gap-2",
    size === "md" && "text-sm md:text-base px-5 py-3 gap-2.5",
    size === "lg" && "text-base md:text-lg px-7 py-4 gap-3",
    variant === "primary" &&
      "bg-terracotta-500 text-ink-950 hover:bg-terracotta-400 active:bg-terracotta-600 hover:-translate-y-0.5 shadow-sm hover:shadow-glow",
    variant === "ember" &&
      "bg-terracotta-300 text-ink-950 hover:bg-terracotta-400 active:bg-terracotta-500 hover:-translate-y-0.5 shadow-md",
    variant === "outline" &&
      surface === "dark" &&
      "bg-transparent text-sand-100 border border-ink-700 hover:border-terracotta-500 hover:text-terracotta-300 active:bg-ink-800",
    variant === "outline" &&
      surface === "light" &&
      "bg-transparent text-ink-900 border border-sand-300 hover:border-terracotta-500 hover:text-terracotta-600 active:bg-sand-300/30",
    variant === "ghost" &&
      "bg-transparent hover:text-terracotta-300 active:opacity-75 p-0",
    disabled &&
      "opacity-40 cursor-not-allowed pointer-events-none hover:translate-y-0 shadow-none",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0 rtl-flip">{icon}</span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseStyles}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseStyles} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
