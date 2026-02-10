"use client";
import { Button } from "@/components";
import { useCart } from "@/contexts";
import { CartProductId } from "@/types";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "sonner";

type Props = {
  productId: CartProductId;
  quantity?: number;
};

export const AddToCartButton = ({ productId, quantity = 1 }: Props) => {
  const { updateCart } = useCart();

  const handleClick = async () => {
    const isSuccess = await updateCart([{ productId, quantity }]);
    if (isSuccess) toast.success("Added to cart");
    else toast.error("Couldn't add to cart");
  };

  return (
    <Button variant="primary" size="md" onClick={handleClick} fullWidth>
      <BiCartAdd size={24} className="shrink-0" />
      <span>Add</span>
    </Button>
  );
};
