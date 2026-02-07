import { EntryId, Maybe } from "@/types";

export type ApiProduct = {
  id: Maybe<EntryId>;
  title: Maybe<string>;
  price: Maybe<number>;
  description: Maybe<string>;
  category: Maybe<string>;
  image: Maybe<string>;
};

export type Product = {
  id: EntryId;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
