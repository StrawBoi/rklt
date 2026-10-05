import React from "react";
import { cn } from "@/lib/cn";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "copper" | "subtle" | "dark";
}

export const Divider: React.FC<DividerProps> = ({
  variant = "copper",
  className,
  ...props
}) => {
  if (variant === "copper") {
    return <div className={cn("copper-hairline my-8 md:my-12", className)} {...props} />;
  }

  return (
    <div
      className={cn(
        "h-px w-full my-8 md:my-12",
        variant === "subtle" && "bg-ink-700/60",
        variant === "dark" && "bg-ink-950/60",
        className
      )}
      {...props}
    />
  );
};
