import { cn } from "@/utils";

export const CartLoading = () => {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl",
        "px-xl py-3xl",
        "flex items-center justify-center min-h-[450px]",
      )}
    >
      <div className={cn("text-center space-y-lg")}>
        <div
          className={cn(
            "inline-block",
            "w-16 h-16",
            "border-4 border-border border-t-primary",
            "rounded-full",
            "animate-spin",
          )}
          aria-label="Loading"
        />
        <p className={cn("text-lg font-medium", "text-muted-foreground")}>
          Loading your cart...
        </p>
      </div>
    </div>
  );
};
