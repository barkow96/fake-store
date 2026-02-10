import { createCategoryJsonLdSchema } from "@/mappers";
import { ProductService } from "@/services";
import { CategoryView } from "@/views";
import { Metadata } from "next";

export async function generateStaticParams() {
  const categories = await ProductService.getProductCategories();
  return categories.map((category) => ({
    name: category,
  }));
}

type Props = {
  params: Promise<{ name: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { name: categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);

  const productsInCategory =
    await ProductService.getProductsInCategory(decodedCategoryName);

  const jsonLd = createCategoryJsonLdSchema(productsInCategory);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryView productsInCategory={productsInCategory} />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name: categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);
  const capitalizedCategoryName =
    decodedCategoryName.charAt(0).toUpperCase() + decodedCategoryName.slice(1);

  const title = `${capitalizedCategoryName} | Fake Store`;
  const description = `Shop ${decodedCategoryName} at Fake Store. Browse our selection of ${decodedCategoryName} products.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
