import { formatMoney } from "@/utils";

describe("formatMoney", () => {
  it("formats whole number as USD currency", () => {
    expect(formatMoney(10)).toBe("$10.00");
  });

  it("formats decimal with two fractional digits", () => {
    expect(formatMoney(19.99)).toBe("$19.99");
  });

  it("formats zero", () => {
    expect(formatMoney(0)).toBe("$0.00");
  });

  it("rounds to two decimal places", () => {
    expect(formatMoney(9.999)).toBe("$10.00");
    expect(formatMoney(9.991)).toBe("$9.99");
  });

  it("adds thousands separator for large numbers", () => {
    expect(formatMoney(1000)).toBe("$1,000.00");
    expect(formatMoney(1234567.89)).toBe("$1,234,567.89");
  });

  it("uses USD symbol", () => {
    expect(formatMoney(1)).toMatch(/^\$/);
  });
});
