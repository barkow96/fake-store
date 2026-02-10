import { cn } from "@/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  asSection?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const ViewContainerNarrow = ({
  children,
  className = "",
  asSection = false,
  ...rest
}: Props) => {
  if (asSection) {
    return (
      <section
        className={cn("mx-auto max-w-7xl", "px-xl py-xl", className)}
        {...rest}
      >
        {children}
      </section>
    );
  }

  return (
    <div
      className={cn("mx-auto max-w-7xl", "px-xl py-xl", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
