import React from "react";
import { cn } from "@/lib/cn";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: "terracotta" | "ember" | "sand" | "blue";
  indicator?: boolean;
  children: React.ReactNode;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  tone = "terracotta",
  indicator = true,
  className,
  children,
  ...props
}) => {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow",
        tone === "terracotta" && "text-terracotta-400",
        tone === "ember" && "text-terracotta-300",
        tone === "sand" && "text-sand-300",
        tone === "blue" && "text-brandblue-400",
        className
      )}
      {...props}
    >
      {indicator && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-none flex-shrink-0",
            tone === "terracotta" && "bg-terracotta-500",
            tone === "ember" && "bg-terracotta-300",
            tone === "sand" && "bg-sand-300",
            tone === "blue" && "bg-brandblue-500"
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </p>
  );
};
