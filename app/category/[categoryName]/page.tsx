import { ORoute } from "@/constants";
import { ProductService } from "@/services";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ categoryName: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { categoryName } = await params;
  const decodedCategory = decodeURIComponent(categoryName);

  const { category, products } =
    await ProductService.getProductsInCategory(decodedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-spacing-lg py-spacing-lg">
          <Link href={ORoute.HOME}>
            <h1 className="text-2xl font-bold text-foreground">Fake Store</h1>
          </Link>

          <Link
            href={ORoute.CART}
            className="flex items-center gap-spacing-sm rounded-radius-md bg-primary px-spacing-lg py-spacing-sm text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
            aria-label="Go to shopping cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Cart</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-spacing-lg py-spacing-2xl">
        <div className="mb-spacing-xl">
          <Link
            href={ORoute.HOME}
            className="inline-flex items-center gap-spacing-sm text-sm text-muted-foreground hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home Page
          </Link>
        </div>

        <div className="mb-spacing-xl">
          <h1 className="text-3xl font-bold capitalize text-foreground">
            {category}
          </h1>
          <p className="mt-spacing-sm text-muted-foreground">
            {products.length} products available
          </p>
        </div>

        <div className="grid grid-cols-1 gap-spacing-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-radius-lg border border-border bg-card p-spacing-lg shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden rounded-radius-md bg-secondary">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="h-full w-full object-contain p-spacing-md transition-transform group-hover:scale-105"
                />
              </div>
              <div className="mt-spacing-md">
                <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground">
                  {product.title}
                </h3>
                <p className="mt-spacing-sm text-lg font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button className="mt-spacing-md w-full rounded-radius-md bg-primary px-spacing-md py-spacing-sm text-sm font-medium text-primary-foreground transition-all hover:opacity-90">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
