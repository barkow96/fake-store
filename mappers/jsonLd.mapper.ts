import { CategoryJsonLdSchema, ProductsInCategory } from "@/types";

const DEFAULT_PRICE_CURRENCY = "USD";

export const createCategoryJsonLdSchema = (
  productInCategory: ProductsInCategory,
): CategoryJsonLdSchema => {
  const { category, products } = productInCategory;
  const categoryUrl = `${process.env.NEXT_PUBLIC_APP_URL}/category/${encodeURIComponent(category)}`;

  const items = products.map((product, index) => {
    const productUrl = `${categoryUrl}#product-${product.id}`;
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": productUrl,
        name: product.title,
        url: productUrl,
        offers: {
          "@type": "Offer",
          priceCurrency: DEFAULT_PRICE_CURRENCY,
          price: product.price,
          availability: "https://schema.org/InStock",
        },
      },
    } as const;
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: categoryUrl,
    name: category,
    itemListElement: items,
    itemListOrder: "ItemListUnordered",
    numberOfItems: products.length,
  };
};
