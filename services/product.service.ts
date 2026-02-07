import { OApiEndpointUrl } from "@/constants";
import { apiToProductsList } from "@/mappers";
import type { Product } from "@/types";

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(OApiEndpointUrl.Products);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return apiToProductsList(data);
  },

  async getProductCategories(): Promise<string[]> {
    const products = await this.getProducts();
    return [...new Set(products.map((product) => product.category))];
  },
};
