import { ProductService } from "@/services";
import { HomeView } from "@/views";

export default async function HomePage() {
  const categories = await ProductService.getProductCategories();

  return <HomeView categories={categories} />;
}
