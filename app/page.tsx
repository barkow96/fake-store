import { ORoute } from "@/constants";
import { ProductService } from "@/services";
import Link from "next/link";

export default async function Home() {
  const categories = await ProductService.getProductCategories();

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
          <h2 className="text-3xl font-bold text-foreground">
            Shop by Category
          </h2>
          <p className="mt-spacing-sm text-muted-foreground">
            Browse our curated collection of products
          </p>
        </div>

        <div className="grid grid-cols-1 gap-spacing-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`${ORoute.CATEGORY}/${encodeURIComponent(category)}`}
              className="group rounded-radius-lg border border-border bg-card p-spacing-xl shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-full flex-col">
                <h3 className="text-lg font-semibold capitalize text-card-foreground group-hover:text-primary">
                  {category}
                </h3>
                <p className="mt-spacing-sm text-sm text-muted-foreground">
                  Explore products →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
