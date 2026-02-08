import { CACHE_REVALIDATE_5_MINUTES, serviceConfig } from "@/configs";
import { OApiEndpointUrl } from "@/constants";
import { apiToAppProductsList, assureProduct } from "@/mappers";
import type { GetProductParams, Product, ProductsInCategory } from "@/types";
import { logError } from "@/utils";

export const ProductService = {
  async getProduct({ id }: GetProductParams): Promise<Product | undefined> {
    const url = `${OApiEndpointUrl.Products}/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: serviceConfig.headers,
      next: { revalidate: CACHE_REVALIDATE_5_MINUTES },
    }).catch((error) => {
      logError("Failed to fetch product by id", { url, error, id });
    });

    if (!response || !response.ok) {
      return;
    }

    const data = await response.json().catch((err) => {
      logError("Failed to parse product data from fetch response", {
        url,
        err,
      });

      return;
    });

    return assureProduct(data);
  },

  async getProducts(): Promise<Product[]> {
    const url = OApiEndpointUrl.Products;

    const response = await fetch(url, {
      method: "GET",
      headers: serviceConfig.headers,
      next: { revalidate: CACHE_REVALIDATE_5_MINUTES },
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

    return apiToAppProductsList(data);
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
};
