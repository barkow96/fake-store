import { EntryId, Maybe } from "@/types";

export type ProductId = EntryId;

export type ApiProduct = {
  id: Maybe<ProductId>;
  title: Maybe<string>;
  price: Maybe<number>;
  description: Maybe<string>;
  category: Maybe<string>;
  image: Maybe<string>;
};

export type Product = {
  id: ProductId;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type ProductsInCategory = {
  category: string;
  products: Product[];
};

export type GetProductParams = {
  id: ProductId;
};
