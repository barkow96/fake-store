import { cn } from "@/utils";
import Link from "next/link";
import { BiArrowToLeft } from "react-icons/bi";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function BackLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-sm",
        "text-base font-medium",
        "text-muted-foreground hover:text-accent",
        "transition-colors duration-fast ease-out",
        "group",
      )}
    >
      <BiArrowToLeft
        size={20}
        className={cn(
          "transition-transform duration-fast ease-out",
          "group-hover:-translate-x-1",
        )}
      />
      {children}
    </Link>
  );
}
