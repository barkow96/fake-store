import { CategoryJsonLdSchema, ProductsInCategory } from "@/types";

export const createCategoryJsonLdSchema = (
  productInCategory: ProductsInCategory,
): CategoryJsonLdSchema => {
  const { category, products } = productInCategory;
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/category/${category}`;

  const items = products.map(
    (product, index) =>
      ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          "@id": url,
          name: product.title,
          url: url,
        },
      }) as const,
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: url,
    name: category,
    itemListElement: items,
    itemListOrder: "ItemListUnordered",
    numberOfItems: products.length,
  };
};
