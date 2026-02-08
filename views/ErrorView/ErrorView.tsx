"use client";
import { Button } from "@/components";
import { ORoute } from "@/constants";
import { cn } from "@/utils";

type Props = {
  error: Error;
};

export const ErrorView = ({ error }: Props) => {
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
          "bg-error/10",
          "mb-xl",
        )}
      >
        <span className={cn("text-5xl")} aria-hidden>
          ⚠️
        </span>
      </div>

      <h1 className={cn("text-4xl font-bold text-foreground", "mb-md")}>
        Something went wrong
      </h1>

      <p className={cn("text-lg text-muted-foreground", "mb-xl")}>
        An unexpected error occurred. You can try again or return to the home
        page.
      </p>

      {process.env.NODE_ENV === "development" && (
        <pre
          className={cn(
            "mb-xl w-full overflow-auto rounded-lg",
            "bg-secondary/50 p-lg text-left text-sm text-foreground",
          )}
        >
          {error.message}
        </pre>
      )}

      <div className={cn("flex flex-wrap items-center justify-center gap-md")}>
        {/* {children} */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => (window.location.href = ORoute.Home)}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};
