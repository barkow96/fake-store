import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { type BaseButtonProps, getButtonClasses } from "./button.style";

type Props = BaseButtonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseButtonProps> & {
    href: string;
    children: ReactNode;
  };

export const ButtonAsLink = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  href,
  ...props
}: Props) => {
  const classes = getButtonClasses(variant, size, fullWidth, className);

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
};
