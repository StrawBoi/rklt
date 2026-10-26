import React from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "default" | "narrow" | "wide" | "full";
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = "div",
  size = "default",
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        size === "narrow" && "max-w-4xl",
        size === "default" && "max-w-none",
        size === "wide" && "max-w-[1440px]",
        size === "full" && "max-w-none px-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
