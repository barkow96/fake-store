import {
  assureArray,
  assureEntryId,
  assureNumber,
  assureString,
} from "@/mappers";
import { ApiProduct, Product } from "@/types";

export const assureProduct = (apiProduct: ApiProduct): Product => {
  return {
    id: assureEntryId(apiProduct?.id, "product.id"),
    title: assureString(apiProduct?.title, "product.title"),
    price: assureNumber(apiProduct?.price, "product.price"),
    description: assureString(apiProduct?.description, "product.description"),
    category: assureString(apiProduct?.category, "product.category"),
    image: assureString(apiProduct?.image, "product.image"),
  };
};

export const apiToAppProductsList = (apiProducts: ApiProduct[]): Product[] => {
  const assuredApiProducts = assureArray<ApiProduct>(apiProducts, "products");

  return assuredApiProducts.map(assureProduct);
};
