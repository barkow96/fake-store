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
import { logError } from "@/utils";
import { serviceConfig } from "./serviceConfig";

export const CartService = {
  async getCart({ id }: GetCartParams): Promise<Cart | undefined> {
    const url = `${OApiEndpointUrl.Carts}/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: serviceConfig.headers,
    }).catch((error) => {
      logError("Failed to fetch cart by id", { url, error, id });
    });

    if (!response || !response.ok) {
      return;
    }

    const data = await response.json().catch((err) => {
      logError("Failed to parse cart data from fetch response", {
        url,
        err,
        id,
      });

      return;
    });

    return assureCart(data);
  },

  async createCart(): Promise<CartId | undefined> {
    const url = OApiEndpointUrl.Carts;

    const response = await fetch(url, {
      method: "POST",
      headers: serviceConfig.headers,
    }).catch((error) => {
      logError("Failed to create cart", { url, error });
    });

    if (!response || !response.ok) {
      return;
    }

    const data = await response.json().catch((err) => {
      logError("Failed to parse created cart data from fetch response", {
        url,
        err,
      });

      return;
    });

    return assureEntryId(data?.id);
  },

  async updateCart(params: UpdateCartParams): Promise<Cart | undefined> {
    const url = `${OApiEndpointUrl.Carts}/${params.id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: serviceConfig.headers,
      body: JSON.stringify(params),
    }).catch((error) => {
      logError("Failed to update cart", { url, error, params });
    });

    if (!response || !response.ok) {
      return;
    }

    const data = await response.json().catch((err) => {
      logError("Failed to parse updated cart data from fetch response", {
        url,
        err,
        params,
      });

      return;
    });

    return assureCart(data);
  },

  async deleteCart(params: DeleteCartParams): Promise<IsSuccess> {
    const url = `${OApiEndpointUrl.Carts}/${params.id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: serviceConfig.headers,
    }).catch((error) => {
      logError("Failed to delete cart", { url, error, params });
    });

    if (!response || !response.ok) {
      return false;
    }

    return true;
  },
};
