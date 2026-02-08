import type { Metadata } from "next";

const title = "Shopping Cart | Fake Store";
const description = "Review and manage items in your cart.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default function CartLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
