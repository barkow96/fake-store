import { ProductService } from "@/services";
import { CategoryView } from "@/views";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { name: categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);

  const productsInCategory =
    await ProductService.getProductsInCategory(decodedCategoryName);

  return <CategoryView productsInCategory={productsInCategory} />;
}
