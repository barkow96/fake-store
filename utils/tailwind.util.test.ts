import { cn } from "@/utils";

describe("cn", () => {
  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });

  it("joins single class", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("joins multiple classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, "bar", null, undefined)).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "hidden")).toBe("base active");
  });

  it("merges conflicting Tailwind classes (tw-merge)", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("keeps non-conflicting Tailwind classes", () => {
    expect(cn("p-4", "m-2")).toBe("p-4 m-2");
  });

  it("handles array of classes", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});
