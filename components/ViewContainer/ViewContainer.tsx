import { cn } from "@/utils";

type Props = { children: React.ReactNode; className?: string };

export const ViewContainer = ({ children, className = "" }: Props) => {
  return (
    <div className={cn("mx-auto max-w-7xl", "px-xl py-xl", className)}>
      {children}
    </div>
  );
};
