import { cn } from "@/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ViewContainerWide = ({
  children,
  className = "",
  ...rest
}: Props) => {
  return (
    <div
      className={cn("mx-auto max-w-full", "px-xl py-xl", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
