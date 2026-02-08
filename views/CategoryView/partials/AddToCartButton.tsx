"use client";
import { Button } from "@/components";
import { useCart } from "@/contexts";
import { CartProductId } from "@/types";
import { BiCartAdd } from "react-icons/bi";

type Props = {
  productId: CartProductId;
  quantity?: number;
};

export const AddToCartButton = ({ productId, quantity = 1 }: Props) => {
  const { updateCart } = useCart();

  return (
    <Button
      variant="primary"
      size="md"
      onClick={() => updateCart([{ productId, quantity }])}
      fullWidth
    >
      <BiCartAdd size={24} className="shrink-0" />
      <span>Add</span>
    </Button>
  );
};
