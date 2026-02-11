const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://fakestoreapi.com";

export const OApiEndpointUrl = {
  Products: `${API_BASE_URL}/products`,
  Carts: `${API_BASE_URL}/carts`,
} as const;
