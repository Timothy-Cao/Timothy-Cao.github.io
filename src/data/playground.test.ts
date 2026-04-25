import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { GALLERY_IMAGE_COUNT, playgroundCards } from "./playground";

function publicPath(src: string) {
  return path.join(process.cwd(), "public", decodeURIComponent(src));
}

describe("playgroundCards", () => {
  it("does not link missing local cover images for active cards", () => {
    const missing = playgroundCards
      .filter((card) => !card.comingSoon && card.coverImage.startsWith("/"))
      .filter((card) => !fs.existsSync(publicPath(card.coverImage)))
      .map((card) => `${card.title}: ${card.coverImage}`);

    expect(missing).toEqual([]);
  });

  it("keeps coming-soon cards non-empty and routeable", () => {
    const comingSoon = playgroundCards.filter((card) => card.comingSoon);

    expect(comingSoon.length).toBeGreaterThan(0);
    for (const card of comingSoon) {
      expect(card.title.trim()).not.toBe("");
      expect(card.subtitle.trim()).not.toBe("");
      expect(card.href.startsWith("/playground/")).toBe(true);
    }
  });
});

describe("gallery data", () => {
  it("matches the expected gallery image count", () => {
    const missing = Array.from({ length: GALLERY_IMAGE_COUNT }, (_, index) => {
      const imagePath = `/assets/media/Photo Gallery/${index + 1}.jpg`;
      return fs.existsSync(publicPath(imagePath)) ? null : imagePath;
    }).filter(Boolean);

    expect(missing).toEqual([]);
  });
});
