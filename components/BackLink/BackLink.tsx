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
        "inline-flex items-center gap-spacing-sm",
        "text-sm",
        "text-muted-foreground hover:text-foreground",
      )}
    >
      <BiArrowToLeft size={16} />
      {children}
    </Link>
  );
}
