const DEFAULT_API_URL = "https://fakestoreapi.com";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    "[apiEndpointUrl] NEXT_PUBLIC_API_URL is not set; using",
    DEFAULT_API_URL,
  );
}

export const OApiEndpointUrl = {
  Products: `${API_BASE_URL}/products`,
  Carts: `${API_BASE_URL}/carts`,
} as const;
