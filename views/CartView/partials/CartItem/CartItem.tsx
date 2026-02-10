"use client";
import { Button } from "@/components";
import { IsSuccess, Product } from "@/types";
import { cn } from "@/utils";
import { BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import { ProductDetails } from "./ProductDetails";
import { QuantitySelector } from "./QuantitySelector";

type Props = {
  product: Product;
  quantity: number;
  onIncrease: () => Promise<IsSuccess>;
  onDecrease: () => Promise<IsSuccess>;
  onRemove: () => Promise<IsSuccess>;
};

export const CartItem = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
  const totalPrice = product.price * quantity;

  const handleIncrease = async () => {
    const isSuccess = await onIncrease();
    if (isSuccess) toast.success("Quantity updated");
    else toast.error("Couldn't update quantity");
  };

  const handleDecrease = async () => {
    const isSuccess = await onDecrease();
    if (isSuccess) toast.success("Quantity updated");
    else toast.error("Couldn't update quantity");
  };

  const handleRemove = async () => {
    const isSuccess = await onRemove();
    if (isSuccess) toast.success("Removed from cart");
    else toast.error("Couldn't remove item");
  };

  return (
    <div
      className={cn(
        // Layout
        "flex flex-col gap-md sm:gap-lg lg:gap-xl lg:flex-row lg:items-start",
        // Styling
        "rounded-xl bg-card",
        "border-2 border-border",
        "p-md",
        // Effects
        "shadow-sm hover:shadow-md",
        "transition-all duration-base ease-out",
      )}
    >
      <ProductDetails
        product={product}
        quantity={quantity}
        totalPrice={totalPrice}
      />

      <div
        className={cn(
          "flex flex-col items-center gap-sm min-[400px]:flex-row min-[400px]:justify-between",
          "lg:flex-col lg:justify-start lg:items-end",
          "flex-shrink-0",
        )}
      >
        <QuantitySelector
          quantity={quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          aria-label="Remove from cart"
        >
          <BiTrash size={18} className="shrink-0" />
        </Button>
      </div>
    </div>
  );
};
