import { cn } from "@/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

type Props = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
};

export const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center gap-sm",
        "font-bold",
        "transition-all duration-base ease-out",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "rounded-md",
        "cursor-pointer",

        // Variant styles
        variant === "primary" && [
          "bg-accent text-accent-foreground",
          "shadow-sm hover:shadow-md",
          "hover:opacity-90 hover:-translate-y-0.5",
        ],
        variant === "secondary" && [
          "bg-card text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ],
        variant === "ghost" && ["text-muted-foreground", "hover:text-error"],
        variant === "icon" && [
          "bg-card text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ],

        // Size styles
        size === "sm" && ["px-sm py-sm", "text-xs"],
        size === "md" && ["px-md py-md", "text-base"],
        size === "lg" && ["px-lg py-lg", "text-lg"],

        // Width
        fullWidth && "w-full",

        // Custom classes
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
