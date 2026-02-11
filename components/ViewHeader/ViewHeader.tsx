import { ORoute } from "@/constants";
import { cn } from "@/utils";
import Link from "next/link";
import { BiArrowToLeft } from "react-icons/bi";

type Props = {
  title: string;
  description?: string;
  withHomeLink?: boolean;
};

export const ViewHeader = ({
  title,
  description = "",
  withHomeLink = false,
}: Props) => {
  return (
    <div className={cn("mb-xl")}>
      {withHomeLink && (
        <div className={cn("mb-sm")}>
          <Link
            href={ORoute.Home}
            className={cn(
              "inline-flex items-center gap-sm",
              "text-base font-medium",
              "text-muted-foreground hover:text-primary",
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
            Back To Home
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-sm">
        <h1 className={cn("text-5xl font-bold capitalize", "text-foreground")}>
          {title}
        </h1>

        {description && (
          <p className={cn("text-lg", "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
