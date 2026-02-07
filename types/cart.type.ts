import { EntryId, Maybe } from "@/types";

export type ApiCartProduct = {
  productId: Maybe<EntryId>;
  quantity: Maybe<number>;
};

export type CartProduct = {
  productId: EntryId;
  quantity: number;
};

export type ApiCart = {
  id: Maybe<EntryId>;
  userId: Maybe<EntryId>;
  products: Maybe<CartProduct[]>;
};

export type Cart = {
  id: EntryId;
  userId: EntryId;
  products: CartProduct[];
};

export type GetCartParams = { id: EntryId };

export type CreateCartParams = { userId: EntryId; products: CartProduct[] };

export type UpdateCartParams = {
  id: EntryId;
  products: CartProduct[];
};

export type DeleteCartParams = { id: EntryId };
