import { CACHE_REVALIDATE_1_MINUTE, serviceConfig } from "@/configs";
import { OApiEndpointUrl } from "@/constants";
import { apiToAppProductsList, assureProduct } from "@/mappers";
import type { GetProductParams, Product, ProductsInCategory } from "@/types";
import { logError, logInfo } from "@/utils";

export const ProductService = {
  async getProduct({ id }: GetProductParams): Promise<Product | undefined> {
    const url = `${OApiEndpointUrl.Products}/${id}`;
    logInfo("[ProductService.getProduct] Fetching", { url, id });

    const response = await fetch(url, {
      method: "GET",
      headers: serviceConfig.headers,
      next: { revalidate: CACHE_REVALIDATE_1_MINUTE },
    }).catch((error) => {
      logError("[ProductService.getProduct] Fetch failed", { url, error, id });
    });

    if (!response || !response.ok) {
      logError("[ProductService.getProduct] Non-OK response", {
        url,
        id,
      });

      return;
    }

    logInfo("[ProductService.getProduct] Response", {
      url,
      status: response.status,
    });

    const data = await response.json().catch((err) => {
      logError(
        "[ProductService.getProduct] Failed to parse product data from fetch response",
        {
          url,
          err,
        },
      );

      return;
    });

    if (!data) return;
    const product = assureProduct(data);
    logInfo("[ProductService.getProduct] Parsed product", { product });
    return product;
  },

  async getProducts(): Promise<Product[]> {
    const url = OApiEndpointUrl.Products;
    logInfo("[ProductService.getProducts] Fetching", { url });

    const response = await fetch(url, {
      method: "GET",
      headers: serviceConfig.headers,
      next: { revalidate: CACHE_REVALIDATE_1_MINUTE },
    }).catch((error) => {
      logError("[ProductService.getProducts] Fetch failed", { url, error });
    });

    if (!response || !response.ok) {
      logError("[ProductService.getProducts] Non-OK response", {
        url,
      });

      return [] as Product[];
    }

    logInfo("[ProductService.getProducts] Response", {
      url,
      status: response.status,
    });

    const data = await response.json().catch((err) => {
      logError(
        "[ProductService.getProducts] Failed to parse products data from fetch response",
        {
          url,
          err,
        },
      );

      return [] as Product[];
    });

    const list = apiToAppProductsList(data);
    logInfo("[ProductService.getProducts] Parsed products count", {
      count: list.length,
    });
    return list;
  },

  async getProductCategories(): Promise<string[]> {
    const products = await this.getProducts();
    return [...new Set(products.map((product) => product.category))].sort(
      (a, b) => a.localeCompare(b),
    );
  },

  async getProductsInCategory(category: string): Promise<ProductsInCategory> {
    const products = await this.getProducts();
    return {
      category,
      products: products
        .filter((product) => product.category === category)
        .sort((a, b) => a.title.localeCompare(b.title)),
    };
  },
};
