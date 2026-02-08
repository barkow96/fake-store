import { ProductService } from "@/services";
import { CategoryView } from "@/views";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ name: string }>;
};

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

export default async function CategoryPage({ params }: Props) {
  const { name: categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);

  const productsInCategory =
    await ProductService.getProductsInCategory(decodedCategoryName);

  return <CategoryView productsInCategory={productsInCategory} />;
}
