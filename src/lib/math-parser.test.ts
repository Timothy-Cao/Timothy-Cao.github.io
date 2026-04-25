import { describe, expect, it } from "vitest";
import { countNumbers, safeEvaluate } from "./math-parser";

describe("safeEvaluate", () => {
  it("respects arithmetic precedence and parentheses", () => {
    expect(safeEvaluate("2+3*4")).toBe(14);
    expect(safeEvaluate("(2+3)*4")).toBe(20);
  });

  it("supports implicit multiplication before parentheses", () => {
    expect(safeEvaluate("2(3+4)")).toBe(14);
    expect(safeEvaluate("(1+2)(3+5)")).toBe(24);
  });

  it("rejects invalid expressions", () => {
    expect(() => safeEvaluate("2+a")).toThrow("Invalid character");
    expect(() => safeEvaluate("(2+3")).toThrow("Mismatched parentheses");
  });
});

describe("countNumbers", () => {
  it("counts repeated number tokens", () => {
    expect(countNumbers(["1", "2", "2", "10"])).toEqual({
      "1": 1,
      "2": 2,
      "10": 1,
    });
  });
});
