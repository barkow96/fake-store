"use client";
import { ButtonAsLink } from "@/components";
import { cn } from "@/utils";

type Props = {
  children: React.ReactNode;
  sectionId: string;
  className?: string;
};

export const ScrollToSectionLink = ({
  children,
  sectionId,
  className,
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  return (
    <ButtonAsLink
      href={`#${sectionId}`}
      onClick={handleClick}
      variant="secondary"
      size="md"
      className={cn("mt-xl rounded-full", className)}
    >
      {children}
    </ButtonAsLink>
  );
};
