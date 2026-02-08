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
    if (isSuccess) toast.success("Successfully added product to the Cart");
    else toast.error("Failed to add product to the Cart");
  };

  return (
    <Button variant="primary" size="md" onClick={handleClick} fullWidth>
      <BiCartAdd size={24} className="shrink-0" />
      <span>Add</span>
    </Button>
  );
};
