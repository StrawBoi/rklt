import React from "react";
import { cn } from "@/lib/cn";

interface NumeralProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "terracotta" | "ember" | "sand" | "blue" | "muted";
  children: React.ReactNode;
}

export const Numeral: React.FC<NumeralProps> = ({
  size = "md",
  tone = "terracotta",
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "font-numeral font-bold leading-none tracking-tight inline-block",
        size === "sm" && "text-xl md:text-2xl",
        size === "md" && "text-3xl md:text-4xl",
        size === "lg" && "text-4xl md:text-5xl lg:text-6xl",
        size === "xl" && "text-6xl md:text-7xl lg:text-8xl",
        tone === "terracotta" && size === "sm" && "text-role-action",
        tone === "terracotta" && size !== "sm" && "text-role-action",
        tone === "ember" && size === "sm" && "text-role-action",
        tone === "ember" && size !== "sm" && "text-role-action",
        tone === "sand" && "text-sand-100",
        tone === "blue" && "text-brandblue-400",
        tone === "muted" && "text-ink-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
