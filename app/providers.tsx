import { CartProvider } from "@/contexts";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return <CartProvider>{children}</CartProvider>;
}
