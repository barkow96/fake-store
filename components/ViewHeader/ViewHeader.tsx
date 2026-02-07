import { ORoute } from "@/constants";
import { cn } from "@/utils";
import { BackLink } from "../BackLink";

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
    <div className={cn("mb-spacing-xl")}>
      {withHomeLink && (
        <BackLink href={ORoute.HOME}>Back to Home Page</BackLink>
      )}

      <h2 className={cn("text-3xl font-bold capitalize", "text-foreground")}>
        {title}
      </h2>

      {description && (
        <p className={cn("mt-spacing-sm", "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
};
