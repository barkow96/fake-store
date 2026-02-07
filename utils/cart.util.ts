import { CartProduct } from "@/types";

/**
 * Merges existing cart products with new products
 *
 * Rules:
 * - If product exists in both arrays, sum quantities
 * - If resulting quantity is <= 0, remove product from cart
 * - If product is new and quantity > 0, add to cart
 *
 * @example
 * // Adding new product
 * mergeCartProducts([], [{ productId: 1, quantity: 2 }])
 * // => [{ productId: 1, quantity: 2 }]
 *
 * @example
 * // Increasing existing product quantity
 * mergeCartProducts(
 *   [{ productId: 1, quantity: 2 }],
 *   [{ productId: 1, quantity: 3 }]
 * )
 * // => [{ productId: 1, quantity: 5 }]
 *
 * @example
 * // Removing product (negative quantity)
 * mergeCartProducts(
 *   [{ productId: 1, quantity: 2 }],
 *   [{ productId: 1, quantity: -2 }]
 * )
 * // => []
 *
 * @example
 * // Partial removal
 * mergeCartProducts(
 *   [{ productId: 1, quantity: 5 }],
 *   [{ productId: 1, quantity: -2 }]
 * )
 * // => [{ productId: 1, quantity: 3 }]
 *
 * @example
 * // Multiple products
 * mergeCartProducts(
 *   [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 3 }],
 *   [{ productId: 1, quantity: 1 }, { productId: 3, quantity: 4 }]
 * )
 * // => [
 * //   { productId: 1, quantity: 3 },
 * //   { productId: 2, quantity: 3 },
 * //   { productId: 3, quantity: 4 }
 * // ]
 */
export const mergeCartProducts = (
  existingProducts: CartProduct[],
  newProducts: CartProduct[],
): CartProduct[] => {
  const productsMap = new Map<number, CartProduct>();

  // Add all existing products to map
  existingProducts.forEach((product) => {
    productsMap.set(product.productId, { ...product });
  });

  // Merge new products
  newProducts.forEach((newProduct) => {
    const existingProduct = productsMap.get(newProduct.productId);

    if (existingProduct) {
      // Product exists - sum quantities
      const newQuantity = existingProduct.quantity + newProduct.quantity;

      if (newQuantity > 0) {
        productsMap.set(newProduct.productId, {
          ...existingProduct,
          quantity: newQuantity,
        });
      } else {
        // Quantity is 0 or negative - remove from cart
        productsMap.delete(newProduct.productId);
      }
    } else {
      // New product - add only if quantity is positive
      if (newProduct.quantity > 0) {
        productsMap.set(newProduct.productId, { ...newProduct });
      }
    }
  });

  return Array.from(productsMap.values());
};
