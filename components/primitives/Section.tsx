import React from "react";
import { cn } from "@/lib/cn";

export type SectionTone = "dark" | "darker" | "light";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  tone?: SectionTone;
  spacing?: "none" | "compact" | "default" | "spacious";
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  as: Component = "section",
  tone = "dark",
  spacing = "default",
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "relative w-full overflow-hidden transition-colors",
        tone === "dark" && "bg-ink-900 text-sand-100",
        tone === "darker" && "bg-ink-950 text-sand-100",
        tone === "light" && "bg-sand-200 text-ink-900",
        spacing === "none" && "py-0",
        spacing === "compact" && "py-12 md:py-16",
        spacing === "default" && "py-16 md:py-24 xl:py-28",
        spacing === "spacious" && "py-24 md:py-32 xl:py-40",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
