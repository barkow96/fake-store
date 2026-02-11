import { cn } from "@/utils";
import { type InputHTMLAttributes, useId } from "react";

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "aria-describedby"
> & {
  label: string;
  ariaDescribedBy?: string;
  wrapperClassName?: string;
};

export function SearchInput({
  label,
  ariaDescribedBy,
  wrapperClassName,
  className,
  ...inputProps
}: Props) {
  const id = useId();

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        type="search"
        role="searchbox"
        aria-describedby={ariaDescribedBy}
        className={cn(
          "w-full",
          "px-md py-sm rounded-md",
          "bg-card border-2 border-border",
          "text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      />
    </div>
  );
}
