import { OApiEndpointUrl } from "@/constants";
import { assureCart } from "@/mappers";
import type {
  Cart,
  CreateCartParams,
  DeleteCartParams,
  GetCartParams,
  IsSuccess,
  UpdateCartParams,
} from "@/types";
import { logError } from "@/utils";
import { getCommonHeaders } from "./config";

export const CartService = {
  async getCart({ id }: GetCartParams): Promise<Cart | undefined> {
    const url = `${OApiEndpointUrl.Carts}/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: getCommonHeaders(),
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

  async createCart(params: CreateCartParams): Promise<Cart | undefined> {
    const url = OApiEndpointUrl.Carts;

    const response = await fetch(url, {
      method: "POST",
      headers: getCommonHeaders(),
      body: JSON.stringify(params),
    }).catch((error) => {
      logError("Failed to create cart", { url, error, params });
    });

    if (!response || !response.ok) {
      return;
    }

    const data = await response.json().catch((err) => {
      logError("Failed to parse created cart data from fetch response", {
        url,
        err,
        params,
      });

      return;
    });

    return assureCart(data);
  },

  async updateCart(params: UpdateCartParams): Promise<Cart | undefined> {
    const url = `${OApiEndpointUrl.Carts}/${params.id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: getCommonHeaders(),
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
      headers: getCommonHeaders(),
    }).catch((error) => {
      logError("Failed to delete cart", { url, error, params });
    });

    if (!response || !response.ok) {
      return false;
    }

    return true;
  },
};
