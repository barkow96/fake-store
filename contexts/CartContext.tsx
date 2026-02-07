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

  const updateCart = async (cartProducts: CartProduct[]): Promise<void> => {
    if (!cartId || !userId) return;

    const params: UpdateCartParams = {
      id: cartId,
      products: cartProducts,
    };

    const updatedCart = await CartService.updateCart(params);

    if (!updatedCart) return;

    const newCart: Cart = {
      id: cartId,
      userId: userId,
      products: cartProducts,
    };

    saveToLocalStorage(newCart);
    setCart(newCart);
  };

  const loadFromLocalStorage = (): {
    userId: EntryId | null;
    cartId: EntryId | null;
    cart: Cart | null;
  } => {
    const userIdStr = getLocalStorageItem(OLocalStorageKey.UserId);
    const cartIdStr = getLocalStorageItem(OLocalStorageKey.CartId);
    const cart = parseCartFromLocalStorage();

    return {
      userId: userIdStr ? parseInt(userIdStr) : null,
      cartId: cartIdStr ? parseInt(cartIdStr) : null,
      cart,
    };
  };

  const saveToLocalStorage = (cart: Cart): void => {
    setLocalStorageItem(OLocalStorageKey.UserId, cart.userId.toString());
    setLocalStorageItem(OLocalStorageKey.CartId, cart.id.toString());
    setLocalStorageItem(OLocalStorageKey.Cart, JSON.stringify(cart));
  };

  const initializeNewCart = async (): Promise<void> => {
    const newCartId = await CartService.createCart();

    if (!newCartId) return;

    const newCart: Cart = {
      id: newCartId,
      userId: USER_ID,
      products: [],
    };

    saveToLocalStorage(newCart);
    setCart(newCart);
    setUserId(USER_ID);
    setCartId(newCartId);
  };

  const initializeExistingCart = (
    userId: EntryId,
    cartId: EntryId,
    cart: Cart,
  ): void => {
    setUserId(userId);
    setCartId(cartId);
    setCart(cart);
  };

  const clearCart = (): void => {
    removeLocalStorageItem(OLocalStorageKey.UserId);
    removeLocalStorageItem(OLocalStorageKey.CartId);
    removeLocalStorageItem(OLocalStorageKey.Cart);

    setUserId(null);
    setCartId(null);
    setCart(null);
  };

  const refreshCart = (): void => {
    const { userId, cartId, cart } = loadFromLocalStorage();

    setUserId(userId);
    setCartId(cartId);
    setCart(cart);
  };

  const initializeCart = useEffectEvent(async () => {
    const { userId, cartId, cart } = loadFromLocalStorage();

    const hasExistingCart = userId && cartId && cart;

    if (hasExistingCart) initializeExistingCart(userId, cartId, cart);
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
