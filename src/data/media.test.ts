import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { compositions } from "./music";
import { pianoYouTubers } from "./piano";
import { videoRecommendations } from "./videos";

function publicPath(src: string) {
  return path.join(process.cwd(), "public", decodeURIComponent(src));
}

function isYouTubeId(value: string) {
  return /^[A-Za-z0-9_-]+$/.test(value);
}

describe("composition media", () => {
  it("points to audio files that exist locally", () => {
    const missing = compositions
      .filter((composition) => composition.type === "audio")
      .filter((composition) => !fs.existsSync(publicPath(composition.src)))
      .map((composition) => `${composition.title}: ${composition.src}`);

    expect(missing).toEqual([]);
  });

  it("keeps AI playback and generated music in distinct categories", () => {
    const aiPlayed = compositions.filter((composition) => composition.category === "ai-played");
    const aiGenerated = compositions.filter((composition) => composition.category === "ai-generated");

    expect(aiPlayed.map((composition) => composition.title).sort()).toEqual([
      "3 Hands",
      "Journey of the Dodo",
      "My September",
      "The Theme of Dodoman",
    ]);
    expect(aiGenerated).toHaveLength(5);
  });
});

describe("youtube recommendation data", () => {
  it("uses valid-looking youtube ids for video recommendations", () => {
    const invalid = videoRecommendations
      .filter((video) => !isYouTubeId(video.youtubeId))
      .map((video) => `${video.title}: ${video.youtubeId}`);

    expect(invalid).toEqual([]);
  });

  it("uses valid-looking youtube ids for piano recommendations", () => {
    const invalid = pianoYouTubers.flatMap((creator) =>
      creator.videoIds
        .filter((videoId) => !isYouTubeId(videoId))
        .map((videoId) => `${creator.name}: ${videoId}`),
    );

    expect(invalid).toEqual([]);
  });
});
