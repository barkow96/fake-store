import { ProductService } from "@/services";
import { CategoryView } from "@/views";

type Props = {
  params: Promise<{ categoryName: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { categoryName } = await params;
  const decodedCategory = decodeURIComponent(categoryName);

  const productsInCategory =
    await ProductService.getProductsInCategory(decodedCategory);

  return <CategoryView productsInCategory={productsInCategory} />;
}
