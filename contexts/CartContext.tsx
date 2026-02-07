"use client";
import { OLocalStorageKey } from "@/constants";
import { CartService } from "@/services";
import { Cart, CartProduct, EntryId, UpdateCartParams } from "@/types";
import {
  getLocalStorageItem,
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

// TODO: In the future, these values will come from API
const USER_ID = 1;
const CART_ID = 1;

type CartContextType = {
  cart: Cart | null;
  userId: EntryId | null;
  cartId: EntryId | null;
  isInitialized: boolean;
  clearCart: () => void;
  refreshCart: () => void;
  updateCart: (cartProducts: CartProduct[]) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [userId, setUserId] = useState<EntryId | null>(null);
  const [cartId, setCartId] = useState<EntryId | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

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

    setUserId(loadedUserId ? parseInt(loadedUserId) : null);
    setCartId(loadedCartId ? parseInt(loadedCartId) : null);
    setCart(parseCartFromLocalStorage());
  };

  const updateCart = async (cartProducts: CartProduct[]) => {
    if (!cartId || !userId) return;

    const params: UpdateCartParams = {
      id: cartId,
      userId: userId,
      products: cartProducts,
    };
    const updatedCart = await CartService.updateCart(params);

    // If success, then let's syncchornize the CartContext (local-storage and global cart state)
    if (updatedCart) {
      const newCart: Cart = {
        id: params.id,
        userId: params.userId,
        products: params.products,
      };

      setCart(newCart);
      setLocalStorageItem(OLocalStorageKey.Cart, JSON.stringify(newCart));
      setLocalStorageItem(OLocalStorageKey.CartId, newCart.id.toString());
      setLocalStorageItem(OLocalStorageKey.UserId, newCart.userId.toString());
    }
  };

  const loadCartData = () => {
    const loadedUserId = getLocalStorageItem(OLocalStorageKey.UserId);
    const loadedCartId = getLocalStorageItem(OLocalStorageKey.CartId);
    const loadedCart = parseCartFromLocalStorage();

    setUserId(loadedUserId ? parseInt(loadedUserId) : null);
    if (!loadedUserId) {
      setLocalStorageItem(OLocalStorageKey.UserId, USER_ID.toString());
    }

    setCartId(loadedCartId ? parseInt(loadedCartId) : null);
    if (!loadedCartId) {
      setLocalStorageItem(OLocalStorageKey.CartId, CART_ID.toString());
    }

    setCart(loadedCart);
    if (!loadedCart) {
      setLocalStorageItem(
        OLocalStorageKey.Cart,
        JSON.stringify({ id: CART_ID, userId: USER_ID, products: [] }),
      );
    }
    setIsInitialized(true);
  };

  const initializeCart = useEffectEvent(() => {
    loadCartData();
  });

  useEffect(() => {
    if (isInitialized) return;

    initializeCart();
  }, [isInitialized]);

  return (
    <CartContext.Provider
      value={{
        cart,
        userId,
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
