"use client";
import { OLocalStorageKey } from "@/constants";
import {
  getLocalStorageItem,
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

// TODO: In the future, these values will come from API
const USER_ID = 1;
const CART_ID = 1;

type CartContextType = {
  userId: string | null;
  cartId: string | null;
  isInitialized: boolean;
  clearCart: () => void;
  refreshCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [userId, setUserId] = useState<string | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeCartStorage = useEffectEvent(() => {
    const existingUserId = getLocalStorageItem(OLocalStorageKey.UserId);
    const existingCartId = getLocalStorageItem(OLocalStorageKey.CartId);

    if (!existingUserId) {
      setLocalStorageItem(OLocalStorageKey.UserId, USER_ID.toString());
    }

    if (!existingCartId) {
      setLocalStorageItem(OLocalStorageKey.CartId, CART_ID.toString());
    }
  });

  const loadCartData = useEffectEvent(() => {
    const loadedUserId = getLocalStorageItem(OLocalStorageKey.UserId);
    const loadedCartId = getLocalStorageItem(OLocalStorageKey.CartId);

    setUserId(loadedUserId);
    setCartId(loadedCartId);
    setIsInitialized(true);
  });

  useEffect(() => {
    if (isInitialized) return;

    initializeCartStorage();
    loadCartData();
  }, [isInitialized]);

  const clearCart = () => {
    removeLocalStorageItem(OLocalStorageKey.UserId);
    removeLocalStorageItem(OLocalStorageKey.CartId);
    removeLocalStorageItem(OLocalStorageKey.Cart);

    setUserId(null);
    setCartId(null);
  };

  const refreshCart = () => {
    const loadedUserId = getLocalStorageItem(OLocalStorageKey.UserId);
    const loadedCartId = getLocalStorageItem(OLocalStorageKey.CartId);

    setUserId(loadedUserId);
    setCartId(loadedCartId);
  };

  return (
    <CartContext.Provider
      value={{
        userId,
        cartId,
        isInitialized,
        clearCart,
        refreshCart,
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
