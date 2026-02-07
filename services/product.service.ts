import { OApiEndpointUrl } from "@/constants";
import { apiToProductsList } from "@/mappers";
import type { Product } from "@/types";
import { logError } from "@/utils";

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    const url = OApiEndpointUrl.Products;

    const response = await fetch(OApiEndpointUrl.Products).catch((error) => {
      logError("Failed to fetch products", { url, error });
    });

    if (!response || !response.ok) {
      return [] as Product[];
    }

    const data = await response.json().catch((err) => {
      logError("Failed to parse products data from fetch response", {
        url,
        err,
      });

      return [] as Product[];
    });

    return apiToProductsList(data);
  },

  async getProductCategories(): Promise<string[]> {
    const products = await this.getProducts();
    return [...new Set(products.map((product) => product.category))];
  },
};
