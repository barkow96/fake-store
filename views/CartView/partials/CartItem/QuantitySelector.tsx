import { Button } from "@/components";
import { cn } from "@/utils";
import { BiMinus, BiPlus } from "react-icons/bi";

type Props = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const QuantitySelector = ({
  quantity,
  onDecrease,
  onIncrease,
}: Props) => {
  return (
    <div
      className={cn(
        "flex items-center gap-xs sm:gap-sm",
        "rounded-md sm:rounded-lg bg-secondary/30",
        "p-xs sm:p-sm",
        "border-2 border-border",
      )}
    >
      <Button
        variant="icon"
        size="sm"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <BiMinus size={18} />
      </Button>

      <span
        className={cn(
          "min-w-[2.5rem] text-center",
          "text-sm font-bold tabular-nums",
          "text-foreground",
        )}
      >
        {quantity}
      </span>

      <Button
        variant="icon"
        size="sm"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <BiPlus size={18} />
      </Button>
    </div>
  );
};
