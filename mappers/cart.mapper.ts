import { apiToProductsList, assureEntryId } from "@/mappers";
import { ApiCart, ApiProduct, Cart } from "@/types";

export const assureCart = (apiCart: ApiCart): Cart => {
  return {
    id: assureEntryId(apiCart?.id, "cart.id"),
    userId: assureEntryId(apiCart?.id, "cart.userId"),
    products: apiToProductsList(apiCart?.products as ApiProduct[]),
  };
};
