import { cn } from "@/utils";

export const CartLoading = () => {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl",
        "px-spacing-lg py-spacing-2xl",
        "flex items-center justify-center",
      )}
    >
      <div className={cn("text-center", "text-muted-foreground")}>
        Loading cart...
      </div>
    </div>
  );
};
