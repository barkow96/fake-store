"use client";
import { OLocalStorageKey } from "@/constants";
import { isNumber } from "@/mappers";
import { CartService } from "@/services";
import { Cart, CartProduct, IsSuccess, UpdateCartParams } from "@/types";
import {
  logInfo,
  logWarn,
  mergeCartProducts,
  parseCartFromLocalStorage,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

type CartContextType = {
  cart: Cart | null;
  isCartInitialized: boolean;
  clearCart: () => void;
  loadCart: () => void;
  updateCart: (cartProducts: CartProduct[]) => Promise<IsSuccess>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartInitialized, setIsCartInitialized] = useState(false);

  const saveCartToLocalStorage = (cart: Cart): void => {
    setLocalStorageItem(OLocalStorageKey.Cart, JSON.stringify(cart));
  };

  const clearCart = (): void => {
    removeLocalStorageItem(OLocalStorageKey.Cart);
    setCart(null);
  };

  const loadCart = (): void => {
    const cart = parseCartFromLocalStorage();
    setCart(cart);
  };

  const updateCart = async (
    productsDiff: CartProduct[],
  ): Promise<IsSuccess> => {
    if (!cart) {
      logWarn("CartProvider updateCart: Missing cart, skipping update", {
        cart,
      });
      return false;
    }

    const mergedProducts = mergeCartProducts(cart.products, productsDiff);

    const params: UpdateCartParams = {
      id: cart.id,
      products: mergedProducts,
    };

    logInfo(
      "CartProvider updateCart: existingProducts, newProducts, mergedProducts",
      {
        existingProducts: cart.products,
        newProducts: productsDiff,
        mergedProducts,
      },
    );

    const updatedCart = await CartService.updateCart(params);

    logInfo("CartProvider updateCart: CartService.updateCart finished", {
      updatedCart,
    });

    if (!updatedCart) {
      logWarn("CartProvider updateCart: CartService.updateCart failed");
      return false;
    }

    const newCart: Cart = {
      id: cart.id,
      products: mergedProducts,
    };

    saveCartToLocalStorage(newCart);
    setCart(newCart);
    return true;
  };

  const initializeNewCart = async (): Promise<void> => {
    const newCartId = await CartService.createCart();

    if (!isNumber(newCartId)) {
      logWarn(
        "CartProvider initializeNewCart: cartId from API is not a number, skipping initialization",
      );
      return;
    }

    const newCart: Cart = {
      id: newCartId,
      products: [],
    };

    saveCartToLocalStorage(newCart);
    setCart(newCart);
  };

  const initializeExistingCart = async (cartFromLS: Cart): Promise<void> => {
    const existingCart = await CartService.getCart({ id: cartFromLS.id });

    if (!existingCart) {
      logWarn(
        "CartProvider initializeExistingCart: CartService.getCart didn't return a cart, creating an empty cart",
      );
      const emptyCart: Cart = { id: cartFromLS.id, products: [] };
      saveCartToLocalStorage(emptyCart);
      setCart(emptyCart);
      return;
    }

    logInfo(
      "CartProvider initializeExistingCart: CartService.getCart returned a cart, updating local storage and state",
      {
        existingCart,
      },
    );
    saveCartToLocalStorage(existingCart);
    setCart(existingCart);
  };

  const initializeCart = useEffectEvent(async () => {
    const cartFromLS = parseCartFromLocalStorage();

    const hasExistingCart = !!cartFromLS;

    if (hasExistingCart) initializeExistingCart(cartFromLS);
    else await initializeNewCart();

    setIsCartInitialized(true);
  });

  useEffect(() => {
    if (isCartInitialized) return;

    initializeCart();
  }, [isCartInitialized]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartInitialized,
        clearCart,
        loadCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
