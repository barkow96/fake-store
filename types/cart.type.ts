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
