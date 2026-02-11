import { cn } from "@/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

export const getButtonClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className?: string,
): string => {
  const classes = cn(
    // Base styles
    "relative inline-flex items-center justify-center gap-sm",
    "font-bold",
    "transition-all duration-base ease-out",
    "rounded-md",
    "cursor-pointer",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-primary focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",

    // Variant styles
    variant === "primary" && [
      "bg-primary text-primary-foreground",
      "shadow-sm hover:shadow-md",
      "hover:opacity-90 hover:-translate-y-0.5",
    ],
    variant === "secondary" && [
      "bg-secondary text-secondary-foreground",
      "hover:bg-primary hover:text-primary-foreground",
    ],
    variant === "ghost" && ["text-muted-foreground", "hover:text-red"],
    variant === "icon" && [
      "bg-card text-foreground",
      "hover:bg-primary hover:text-primary-foreground",
    ],

    // Size styles
    size === "sm" && ["px-sm py-sm", "text-xs"],
    size === "md" && ["px-md py-md", "text-base"],
    size === "lg" && ["px-lg py-lg", "text-lg"],

    // Width
    fullWidth && "w-full",

    // Custom classes
    className,
  );

  return classes;
};
