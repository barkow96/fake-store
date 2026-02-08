import { ButtonAsLink } from "@/components";
import { ORoute } from "@/constants";
import { cn } from "@/utils";

export const NotFoundView = () => {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl w-full",
        "px-xl py-3xl",
        "flex flex-col items-center justify-center",
        "min-h-[60vh]",
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
        <span className={cn("text-6xl font-bold", "text-muted-foreground")}>
          404
        </span>
      </div>

      <h1 className={cn("text-4xl font-bold text-foreground", "mb-md")}>
        Page not found
      </h1>

      <p className={cn("text-lg text-muted-foreground", "mb-xl")}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <ButtonAsLink
        href={ORoute.HOME}
        variant="primary"
        size="md"
        className="w-[200px]"
      >
        Back to Home
      </ButtonAsLink>
    </div>
  );
};
