"use client";
import { BackLink, CartItem, Header } from "@/components";
import { ORoute } from "@/constants";
import { useCart } from "@/contexts";
import { ProductService } from "@/services";
import { Product } from "@/types";
import { cn, logError } from "@/utils";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, isInitialized, updateCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuantityChange = async (
    productId: number,
    quantityChange: number,
  ): Promise<void> => {
    if (!cart) return;

    const productsDiff = [{ productId, quantity: quantityChange }];

    await updateCart(productsDiff);
  };

  const handleRemove = async (productId: number): Promise<void> => {
    if (!cart) return;

    const product = cart.products.find((p) => p.productId === productId);
    if (!product) return;

    const productsDiff = [{ productId, quantity: -product.quantity }];

    await updateCart(productsDiff);
  };

  const totalPrice = cart?.products.reduce((sum, cartProduct) => {
    const product = products.find((p) => p.id === cartProduct.productId);
    return sum + (product?.price || 0) * cartProduct.quantity;
  }, 0);

  const totalItems =
    cart?.products.reduce((sum, p) => sum + p.quantity, 0) || 0;

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

  if (!isInitialized || isLoading) {
    return (
      <div className={cn("min-h-screen", "bg-background")}>
        <Header />
        <main
          className={cn(
            "mx-auto max-w-7xl",
            "px-spacing-lg py-spacing-2xl",
            "flex items-center justify-center",
          )}
        >
          <div className={cn("text-center", "text-muted-foreground")}>
            Loading cart...
          </div>
        </main>
      </div>
    );
  }

  const isEmpty = !cart?.products.length;

  return (
    <div className={cn("min-h-screen", "bg-background")}>
      <Header />

      <main className={cn("mx-auto max-w-7xl", "px-spacing-lg py-spacing-2xl")}>
        <div className={cn("mb-spacing-xl")}>
          <BackLink href={ORoute.HOME}>Back to Home</BackLink>
        </div>

        <div className={cn("mb-spacing-xl")}>
          <h1 className={cn("text-3xl font-bold", "text-foreground")}>
            Shopping Cart
          </h1>
          <p className={cn("mt-spacing-sm", "text-muted-foreground")}>
            {isEmpty
              ? "Your cart is empty"
              : `${totalItems} ${totalItems === 1 ? "item" : "items"} in cart`}
          </p>
        </div>

        {isEmpty ? (
          <div
            className={cn(
              "rounded-radius-lg",
              "bg-card",
              "border border-border",
              "p-spacing-2xl",
              "text-center",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("mx-auto", "text-muted-foreground")}
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h2
              className={cn(
                "mt-spacing-lg",
                "text-xl font-semibold",
                "text-foreground",
              )}
            >
              Your cart is empty
            </h2>
            <p className={cn("mt-spacing-sm", "text-muted-foreground")}>
              Add some products to get started
            </p>
          </div>
        ) : (
          <div className={cn("grid gap-spacing-xl", "lg:grid-cols-3")}>
            {/* Cart Items */}
            <div className={cn("lg:col-span-2", "space-y-spacing-md")}>
              {cart.products.map((cartProduct) => {
                const product = products.find(
                  (p) => p.id === cartProduct.productId,
                );
                if (!product) return null;

                return (
                  <CartItem
                    key={cartProduct.productId}
                    product={product}
                    quantity={cartProduct.quantity}
                    onIncrease={() =>
                      handleQuantityChange(cartProduct.productId, 1)
                    }
                    onDecrease={() =>
                      handleQuantityChange(cartProduct.productId, -1)
                    }
                    onRemove={() => handleRemove(cartProduct.productId)}
                  />
                );
              })}
            </div>

            {/* Order Summary */}
            <div className={cn("lg:col-span-1")}>
              <div
                className={cn(
                  "sticky top-spacing-lg",
                  "rounded-radius-lg",
                  "bg-card",
                  "border border-border",
                  "p-spacing-xl",
                  "shadow-sm",
                )}
              >
                <h2
                  className={cn(
                    "text-xl font-bold",
                    "text-foreground",
                    "mb-spacing-lg",
                  )}
                >
                  Order Summary
                </h2>

                <div className={cn("space-y-spacing-md", "mb-spacing-lg")}>
                  <div className={cn("flex justify-between", "text-sm")}>
                    <span className={cn("text-muted-foreground")}>
                      Subtotal ({totalItems} items)
                    </span>
                    <span className={cn("font-medium", "text-foreground")}>
                      ${totalPrice?.toFixed(2)}
                    </span>
                  </div>
                  <div className={cn("flex justify-between", "text-sm")}>
                    <span className={cn("text-muted-foreground")}>
                      Shipping
                    </span>
                    <span className={cn("font-medium", "text-foreground")}>
                      Free
                    </span>
                  </div>
                  <div
                    className={cn(
                      "border-t border-border",
                      "pt-spacing-md",
                      "flex justify-between",
                    )}
                  >
                    <span
                      className={cn("text-lg font-bold", "text-foreground")}
                    >
                      Total
                    </span>
                    <span
                      className={cn("text-lg font-bold", "text-foreground")}
                    >
                      ${totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  className={cn(
                    "w-full",
                    "rounded-radius-md",
                    "bg-primary text-primary-foreground",
                    "px-spacing-lg py-spacing-md",
                    "text-base font-semibold",
                    "transition-all hover:opacity-90",
                    "shadow-sm hover:shadow-md",
                  )}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
