import { EntryId } from "@/types";

export type Product = {
  id: EntryId;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
