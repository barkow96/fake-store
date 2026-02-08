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
    <div className={cn("mb-3xl")}>
      {withHomeLink && (
        <div className={cn("mb-xl")}>
          <BackLink href={ORoute.HOME}>Back to Home</BackLink>
        </div>
      )}

      <div>
        <h1 className={cn("text-5xl font-bold capitalize", "text-foreground")}>
          {title}
        </h1>

        {description && (
          <p className={cn("mt-lg text-lg", "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
