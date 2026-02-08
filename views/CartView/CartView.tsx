"use client";
import { ViewHeader } from "@/components";
import { Cart, Product } from "@/types";
import { cn } from "@/utils";
import { CartEmpty, CartItem, CartLoading, OrderSummary } from "./partials";

type Props = {
  cart: Cart | null;
  isInitialized: boolean;
  isLoading: boolean;
  products: Product[];
  totalItems: number;
  totalPrice: number;
  onQuantityChange: (productId: number, quantityChange: number) => void;
  onRemove: (productId: number) => void;
};

export const CartView = ({
  cart,
  isInitialized,
  isLoading,
  products,
  totalItems,
  totalPrice,
  onQuantityChange,
  onRemove,
}: Props) => {
  if (!isInitialized || isLoading) {
    return <CartLoading />;
  }

  const isEmpty = !cart?.products.length;
  const description = isEmpty
    ? "Your cart is empty"
    : `${totalItems} ${totalItems === 1 ? "item" : "items"} in cart`;

  return (
    <main className={cn("mx-auto max-w-7xl", "px-xl py-3xl")}>
      <ViewHeader
        title="Shopping Cart"
        description={description}
        withHomeLink
      />

      {isEmpty && <CartEmpty />}

      {!isEmpty && (
        <div className={cn("grid gap-2xl", "lg:grid-cols-3")}>
          {/* Cart Items Section*/}
          <section className={cn("lg:col-span-2", "space-y-lg")}>
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
                  onIncrease={() => onQuantityChange(cartProduct.productId, 1)}
                  onDecrease={() => onQuantityChange(cartProduct.productId, -1)}
                  onRemove={() => onRemove(cartProduct.productId)}
                />
              );
            })}
          </section>

          {/* Order Summary Section*/}
          <section className={cn("lg:col-span-1")}>
            <OrderSummary totalItems={totalItems} totalPrice={totalPrice} />
          </section>
        </div>
      )}
    </main>
  );
};
