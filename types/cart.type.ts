import { EntryId, Maybe, UserId } from "@/types";

export type CartId = EntryId;
export type CartProductId = EntryId;

export type ApiCartProduct = {
  productId: Maybe<CartProductId>;
  quantity: Maybe<number>;
};

export type CartProduct = {
  productId: CartProductId;
  quantity: number;
};

export type ApiCart = {
  id: Maybe<CartId>;
  userId: Maybe<UserId>;
  products: Maybe<CartProduct[]>;
};

export type Cart = {
  id: CartId;
  products: CartProduct[];
};

export type GetCartParams = { id: CartId };

export type CreateCartParams = { userId: UserId; products: CartProduct[] };

export type UpdateCartParams = {
  id: CartId;
  products: CartProduct[];
};

export type DeleteCartParams = { id: CartId };
