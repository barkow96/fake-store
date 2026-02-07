import { OApiEndpointUrl } from "@/constants";
import { apiToProductsList } from "@/mappers";
import type { Product, ProductsInCategory } from "@/types";
import { logError } from "@/utils";
import { getCommonHeaders } from "./config";

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    const url = OApiEndpointUrl.Products;

    const response = await fetch(url, {
      method: "GET",
      headers: getCommonHeaders(),
    }).catch((error) => {
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

  async getProductsInCategory(category: string): Promise<ProductsInCategory> {
    const products = await this.getProducts();
    return {
      category,
      products: products.filter((product) => product.category === category),
    };
  },

  async getProductsInAllCategories(): Promise<ProductsInCategory[]> {
    const products = await this.getProducts();
    const categoriesMap = new Map<string, Product[]>();

    products.forEach((product) => {
      const existing = categoriesMap.get(product.category) || [];
      categoriesMap.set(product.category, [...existing, product]);
    });

    return Array.from(categoriesMap.entries()).map(([category, products]) => ({
      category,
      products,
    }));
  },
};
