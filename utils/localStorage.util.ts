import { OLocalStorageKey } from "@/constants";
import { assureCart } from "@/mappers";
import { Cart } from "@/types";
import { logWarn } from "@/utils";

export const getLocalStorageItem = (key: string): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key: string): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(key);
};

export const parseCartFromLocalStorage = (): Cart | null => {
  const cart = getLocalStorageItem(OLocalStorageKey.Cart);

  const assuredCart: Cart | null = (() => {
    try {
      if (!cart) return null;
      return assureCart(JSON.parse(cart));
    } catch (error) {
      logWarn("Failed to parse cart from local storage", { error, cart });
      return null;
    }
  })();

  return assuredCart;
};
