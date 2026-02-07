import { OApiEndpointUrl } from "@/constants";
import type { Product } from "@/types";

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(OApiEndpointUrl.Products);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  async getProductCategories(): Promise<string[]> {
    const products = await this.getProducts();
    return [...new Set(products.map((product) => product.category))];
  },
};
