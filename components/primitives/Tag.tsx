import React from "react";
import { cn } from "@/lib/cn";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "terracotta" | "ember" | "sand" | "blue" | "neutral";
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  variant = "terracotta",
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-semibold tracking-wider uppercase",
        variant === "terracotta" &&
          "bg-terracotta-500/15 text-terracotta-300 border border-terracotta-500/30",
        variant === "ember" &&
          "bg-terracotta-300/15 text-terracotta-300 border border-terracotta-300/30",
        variant === "sand" &&
          "bg-sand-300/15 text-sand-100 border border-sand-300/30",
        variant === "blue" &&
          "bg-brandblue-500/15 text-brandblue-400 border border-brandblue-500/30",
        variant === "neutral" &&
          "bg-ink-800 text-ink-600 border border-ink-700",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
