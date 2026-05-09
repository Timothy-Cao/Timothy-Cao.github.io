import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  "/",
  "/about",
  "/playground",
  "/playground/astronomy",
  "/playground/beats",
  "/playground/fermi",
  "/playground/gallery",
  "/playground/games/24",
  "/playground/games/scrabble",
  "/playground/geoguessr",
  "/playground/mapledle",
  "/playground/math-art",
  "/playground/music",
  "/playground/piano",
  "/playground/shelf",
  "/playground/videos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-25T00:00:00.000Z");

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route === "/playground" ? 0.9 : 0.7,
  }));
}
