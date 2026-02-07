import { EntryId, Maybe, Product } from "@/types";

export type ApiCart = {
  id: Maybe<EntryId>;
  userId: Maybe<EntryId>;
  products: Maybe<Product[]>;
};

export type Cart = {
  id: EntryId;
  userId: EntryId;
  products: Product[];
};
