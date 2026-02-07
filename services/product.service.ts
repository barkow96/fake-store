import { OApiEndpointUrl } from "@/constants";
import type { Product } from "@/types";

// TODO: Improve the service
export const ProductService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(OApiEndpointUrl.Products);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },
};
