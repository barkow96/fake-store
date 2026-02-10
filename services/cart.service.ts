import { serviceConfig } from "@/configs";
import { OApiEndpointUrl } from "@/constants";
import { assureCart, assureEntryId } from "@/mappers";
import type {
  Cart,
  CartId,
  DeleteCartParams,
  GetCartParams,
  IsSuccess,
  UpdateCartParams,
} from "@/types";
import { logError, logInfo } from "@/utils";

export const CartService = {
  async getCart({ id }: GetCartParams): Promise<Cart | undefined> {
    const url = `${OApiEndpointUrl.Carts}/${id}`;
    logInfo("[CartService.getCart] Fetching", { url, id });

    const response = await fetch(url, {
      method: "GET",
      headers: serviceConfig.headers,
    }).catch((error) => {
      logError("[CartService.getCart] Fetch failed", { url, error, id });
    });

    if (!response || !response.ok) {
      if (response) {
        logError("[CartService.getCart] Non-OK response", {
          url,
          id,
          status: response.status,
          statusText: response.statusText,
        });
      }
      return;
    }

    logInfo("[CartService.getCart] Response", { url, status: response.status });

    const data = await response.json().catch((err) => {
      logError("Failed to parse cart data from fetch response", {
        url,
        err,
        id,
      });

      return;
    });

    if (!data) return;
    const cart = assureCart(data);
    logInfo("[CartService.getCart] Parsed cart", {
      cart,
    });
    return cart;
  },

  async createCart(): Promise<CartId | undefined> {
    const url = OApiEndpointUrl.Carts;
    logInfo("[CartService.createCart] Creating cart", { url });

    const response = await fetch(url, {
      method: "POST",
      headers: serviceConfig.headers,
    }).catch((error) => {
      logError("[CartService.createCart] Fetch failed", { url, error });
    });

    if (!response || !response.ok) {
      logError("[CartService.createCart] Non-OK response", {
        url,
      });

      return;
    }

    logInfo("[CartService.createCart] Response", {
      url,
      status: response.status,
    });

    const data = await response.json().catch((err) => {
      logError("Failed to parse created cart data from fetch response", {
        url,
        err,
      });

      return;
    });

    const cartId = assureEntryId(data?.id, undefined);
    logInfo("[CartService.createCart] Created", { cartId });
    return cartId;
  },

  async updateCart(params: UpdateCartParams): Promise<Cart | undefined> {
    const url = `${OApiEndpointUrl.Carts}/${params.id}`;
    logInfo("[CartService.updateCart] Updating cart", {
      url,
      cartId: params.id,
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: serviceConfig.headers,
      body: JSON.stringify(params),
    }).catch((error) => {
      logError("Failed to update cart", { url, error, params });
    });

    if (!response || !response.ok) {
      logError("[CartService.updateCart] Non-OK response", {
        url,
        cartId: params.id,
      });

      return;
    }

    logInfo("[CartService.updateCart] Response", {
      url,
      status: response.status,
    });

    const data = await response.json().catch((err) => {
      logError("Failed to parse updated cart data from fetch response", {
        url,
        err,
        params,
      });

      return;
    });

    if (!data) return;
    const cart = assureCart(data);
    logInfo("[CartService.updateCart] Updated", {
      cartId: params.id,
      productsCount: cart.products.length,
    });
    return cart;
  },

  async deleteCart(params: DeleteCartParams): Promise<IsSuccess> {
    const url = `${OApiEndpointUrl.Carts}/${params.id}`;
    logInfo("[CartService.deleteCart] Deleting cart", { url, id: params.id });

    const response = await fetch(url, {
      method: "DELETE",
      headers: serviceConfig.headers,
    }).catch((error) => {
      logError("Failed to delete cart", { url, error, params });
    });

    if (!response || !response.ok) {
      logError("[CartService.deleteCart] Non-OK response", {
        url,
        id: params.id,
      });

      return false;
    }

    logInfo("[CartService.deleteCart] Deleted", {
      url,
      id: params.id,
      status: response.status,
    });
    return true;
  },
};
