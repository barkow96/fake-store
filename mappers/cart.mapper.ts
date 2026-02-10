import { assureArray, assureEntryId, assureNumber } from "@/mappers";
import { ApiCart, ApiCartProduct, Cart, CartProduct } from "@/types";

export const assureCartProduct = (
  apiCartProduct: ApiCartProduct,
): CartProduct => {
  return {
    productId: assureEntryId(
      apiCartProduct?.productId,
      "cartProduct.productId",
    ),
    quantity: assureNumber(apiCartProduct?.quantity, "cartProduct.quantity"),
  };
};

export const apiToAppCartProductsList = (
  apiCartProducts: ApiCartProduct[],
): CartProduct[] => {
  const assuredApiCartProducts = assureArray<ApiCartProduct>(
    apiCartProducts,
    "cartProducts",
  );

  return assuredApiCartProducts.map(assureCartProduct);
};

export const assureCart = (apiCart: ApiCart): Cart => {
  return {
    id: assureEntryId(apiCart?.id, "cart.id"),
    products: apiToAppCartProductsList(apiCart?.products as ApiCartProduct[]),
  };
};
