import { ScrollToSectionLink } from "@/components";
import { SECTION_HOME_VIEW_CATEGORY_SECTION_ID } from "@/constants";
import { cn } from "@/utils";

export const Hero = () => {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "min-h-[calc(100vh-180px)]",
        "flex flex-col items-center justify-center",
        "py-2xl md:py-3xl",
        "rounded-xl",
        "bg-gradient-to-b from-secondary/50 to-transparent",
        "border border-border/50",
      )}
    >
      <div
        className={cn(
          "absolute left-0 right-0 top-0 h-px",
          "bg-gradient-to-r from-transparent via-accent/40 to-transparent",
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative flex flex-col items-center text-center w-full px-md",
        )}
      >
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
            "text-foreground",
          )}
        >
          Fake products. <span className="text-accent">Real experience.</span>
        </h2>

        <p
          className={cn(
            "mt-md",
            "text-base md:text-lg",
            "text-muted-foreground",
          )}
        >
          The sandbox store for building, testing, and shipping. No real
          checkout. Just real skills.
        </p>

        <ScrollToSectionLink sectionId={SECTION_HOME_VIEW_CATEGORY_SECTION_ID}>
          Browse categories below
        </ScrollToSectionLink>
      </div>
    </div>
  );
};
