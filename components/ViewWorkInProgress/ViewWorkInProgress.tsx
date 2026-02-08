import { ButtonAsLink } from "@/components";
import { ORoute } from "@/constants";
import { cn } from "@/utils";
import { BiWrench } from "react-icons/bi";

export const ViewWorkInProgress = () => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "min-h-[400px]",
        "rounded-2xl bg-card",
        "border-2 border-dashed border-border",
        "p-3xl mt-xl",
        "text-center",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          "w-32 h-32 rounded-full",
          "bg-secondary/50",
          "mb-xl",
        )}
      >
        <BiWrench size={64} className={cn("text-muted-foreground")} />
      </div>

      <h2 className={cn("text-2xl font-bold text-foreground", "mb-md")}>
        Work in progress
      </h2>

      <p className={cn("text-muted-foreground mb-xl")}>
        This section is still under construction. Check back soon!
      </p>

      <ButtonAsLink href={ORoute.Home} variant="primary" size="md">
        Back to Home
      </ButtonAsLink>
    </div>
  );
};
