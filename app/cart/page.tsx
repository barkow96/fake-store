"use client";
import { useCart } from "@/contexts";
import { ProductService } from "@/services";
import { CartProductId, IsSuccess, Product } from "@/types";
import { logError } from "@/utils";
import { CartView } from "@/views";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, isCartInitialized: isInitialized, updateCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuantityChange = async (
    productId: CartProductId,
    quantityChange: number,
  ): Promise<IsSuccess> => {
    if (!cart) return false;

    const productsDiff = [{ productId, quantity: quantityChange }];

    const isSuccess = await updateCart(productsDiff);
    return isSuccess;
  };

  const handleRemove = async (productId: CartProductId): Promise<IsSuccess> => {
    if (!cart) return false;

    const product = cart.products.find((p) => p.productId === productId);
    if (!product) return false;

    const productsDiff = [{ productId, quantity: -product.quantity }];

    const isSuccess = await updateCart(productsDiff);
    return isSuccess;
  };

  const totalItems =
    cart?.products.reduce((sum, p) => sum + p.quantity, 0) || 0;

  const totalPrice =
    cart?.products.reduce((sum, cartProduct) => {
      const product = products.find((p) => p.id === cartProduct.productId);
      return sum + (product?.price || 0) * cartProduct.quantity;
    }, 0) || 0;

  useEffect(() => {
    const loadProducts = async () => {
      if (!cart?.products.length) {
        setIsLoading(false);
        return;
      }

      try {
        const productIds = cart.products.map((p) => p.productId);
        const result = await Promise.allSettled(
          productIds.map((id) => ProductService.getProduct({ id })),
        );

        const newProducts = result.reduce<Product[]>((acc, settled) => {
          if (settled.status === "fulfilled" && settled.value !== undefined) {
            return [...acc, settled.value];
          }
          return acc;
        }, []);

        setProducts(newProducts);
      } catch (error) {
        logError("CartPage useEffect: Failed to load products", { error });
      } finally {
        setIsLoading(false);
      }
    };

    if (isInitialized) {
      loadProducts();
    }
  }, [cart?.products, isInitialized]);

  return (
    <CartView
      cart={cart}
      isInitialized={isInitialized}
      isLoading={isLoading}
      products={products}
      totalItems={totalItems}
      totalPrice={totalPrice}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemove}
    />
  );
}
