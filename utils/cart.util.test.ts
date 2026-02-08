import { mergeCartProducts } from "@/utils";

describe("mergeCartProducts", () => {
  it("returns empty array when both inputs are empty", () => {
    expect(mergeCartProducts([], [])).toEqual([]);
  });

  it("adds new product when existing is empty", () => {
    expect(mergeCartProducts([], [{ productId: 1, quantity: 2 }])).toEqual([
      { productId: 1, quantity: 2 },
    ]);
  });

  it("sums quantity when product exists in both arrays", () => {
    expect(
      mergeCartProducts(
        [{ productId: 1, quantity: 2 }],
        [{ productId: 1, quantity: 3 }],
      ),
    ).toEqual([{ productId: 1, quantity: 5 }]);
  });

  it("removes product when resulting quantity is 0", () => {
    expect(
      mergeCartProducts(
        [{ productId: 1, quantity: 2 }],
        [{ productId: 1, quantity: -2 }],
      ),
    ).toEqual([]);
  });

  it("removes product when resulting quantity is negative", () => {
    expect(
      mergeCartProducts(
        [{ productId: 1, quantity: 2 }],
        [{ productId: 1, quantity: -5 }],
      ),
    ).toEqual([]);
  });

  it("decreases quantity when delta is negative but result stays positive", () => {
    expect(
      mergeCartProducts(
        [{ productId: 1, quantity: 5 }],
        [{ productId: 1, quantity: -2 }],
      ),
    ).toEqual([{ productId: 1, quantity: 3 }]);
  });

  it("does not add new product when quantity is 0", () => {
    expect(mergeCartProducts([], [{ productId: 1, quantity: 0 }])).toEqual([]);
  });

  it("does not add new product when quantity is negative", () => {
    expect(mergeCartProducts([], [{ productId: 1, quantity: -1 }])).toEqual([]);
  });

  it("merges multiple products correctly", () => {
    const existingProducts = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];
    const newProducts = [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 4 },
    ];
    expect(mergeCartProducts(existingProducts, newProducts)).toEqual([
      { productId: 1, quantity: 3 },
      { productId: 2, quantity: 3 },
      { productId: 3, quantity: 4 },
    ]);
  });

  it("does not mutate input arrays", () => {
    const existingProducts = [{ productId: 1, quantity: 2 }];
    const newProducts = [{ productId: 1, quantity: 1 }];
    const existingProductsSnapshot = JSON.stringify(existingProducts);
    const newProductsSnapshot = JSON.stringify(newProducts);

    mergeCartProducts(existingProducts, newProducts);
    expect(JSON.stringify(existingProducts)).toBe(existingProductsSnapshot);
    expect(JSON.stringify(newProducts)).toBe(newProductsSnapshot);
  });
});
