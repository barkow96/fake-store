import { ProductService } from "@/services";
import { HomeView } from "@/views";

export default async function Home() {
  const categories = await ProductService.getProductCategories();

  return <HomeView categories={categories} />;
}
