"use client";
import { OLocalStorageKey } from "@/constants";
import { isNumber } from "@/mappers";
import { CartService } from "@/services";
import {
  Cart,
  CartId,
  CartProduct,
  IsSuccess,
  UpdateCartParams,
} from "@/types";
import {
  getLocalStorageItem,
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
  cartId: CartId | null;
  isInitialized: boolean;
  clearCart: () => void;
  refreshCart: () => void;
  updateCart: (cartProducts: CartProduct[]) => Promise<IsSuccess>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<CartId | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const updateCart = async (
    productsDiff: CartProduct[],
  ): Promise<IsSuccess> => {
    if (!cartId || !cart) {
      logWarn(
        "CartProvider updateCart: Missing cartId or cart, skipping update",
      );
      return false;
    }

    const mergedProducts = mergeCartProducts(cart.products, productsDiff);

    const params: UpdateCartParams = {
      id: cartId,
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

    logInfo("CartProvider updateCart: updatedCart", updatedCart);

    if (!updatedCart) {
      logWarn("CartProvider updateCart: failed to update cart");
      return false;
    }

    const newCart: Cart = {
      id: cartId,
      products: mergedProducts,
    };

    saveToLocalStorage(newCart);
    setCart(newCart);
    return true;
  };

  const loadFromLocalStorage = (): {
    cartId: CartId | null;
    cart: Cart | null;
  } => {
    const cartIdStr = getLocalStorageItem(OLocalStorageKey.CartId);
    const cart = parseCartFromLocalStorage();

    return {
      cartId: cartIdStr ? parseInt(cartIdStr) : null,
      cart,
    };
  };

  const saveToLocalStorage = (cart: Cart): void => {
    setLocalStorageItem(OLocalStorageKey.CartId, cart.id.toString());
    setLocalStorageItem(OLocalStorageKey.Cart, JSON.stringify(cart));
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

    saveToLocalStorage(newCart);
    setCart(newCart);
    setCartId(newCartId);
  };

  const clearCart = (): void => {
    removeLocalStorageItem(OLocalStorageKey.CartId);
    removeLocalStorageItem(OLocalStorageKey.Cart);

    setCartId(null);
    setCart(null);
  };

  const refreshCart = (): void => {
    const { cartId, cart } = loadFromLocalStorage();

    setCartId(cartId);
    setCart(cart);
  };

  const initializeExistingCart = (cartId: CartId, cart: Cart): void => {
    setCartId(cartId);
    setCart(cart);
  };

  const initializeCart = useEffectEvent(async () => {
    const { cartId, cart } = loadFromLocalStorage();

    const hasExistingCart = cartId && cart;

    if (hasExistingCart) initializeExistingCart(cartId, cart);
    else await initializeNewCart();

    setIsInitialized(true);
  });

  useEffect(() => {
    if (isInitialized) return;

    initializeCart();
  }, [isInitialized]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isInitialized,
        clearCart,
        refreshCart,
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
