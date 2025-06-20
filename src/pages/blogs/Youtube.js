import React, { useState } from "react";

const videoData = [
  {
    id: "1",
    title: "When Will I Ever Use Math? How to Actually Answer This Question",
    subtitle: "Math The World",
    youtubeId: "i7qoq3KQiaw",
    description: "",
  },
  {
    id: "2",
    title: "Wealth Inequality in America",
    subtitle: "Politizane",
    youtubeId: "QPKKQnijnsM",
    description: "",
  },
  {
    id: "3",
    title: "Why You Will Marry the Wrong Person",
    subtitle: "The School of Life",
    youtubeId: "-EvvPZFdjyk",
    description: "",
  },
  {
    id: "5",
    title: "What “Follow Your Dreams” Misses | Harvey Mudd Commencement Speech 2024",
    subtitle: "3Blue1Brown",
    youtubeId: "W3I3kAg2J7w",
    description: "",
  },
  {
    id: "6",
    title: "The Egg – A Short Story (Animated by Kurzgesagt)",
    subtitle: "Kurzgesagt – In a Nutshell",
    youtubeId: "h6fcK_fRYaI",
    description: "",
  },
  {
    id: "7",
    title: "In Search of a Flat Earth",
    subtitle: "Folding Ideas",
    youtubeId: "JTfhYyTuT44",
    description: "",
  },
  {
    id: "8",
    title: "AlphaGo – The Movie | Full award‑winning documentary",
    subtitle: "DeepMind",
    youtubeId: "WXuK6gekU1Y",
    description: "",
  },
  {
    id: "9",
    title: "The Power of Suggestion",
    subtitle: "Vsauce",
    youtubeId: "QDCcuCHOIyY",
    description: "",
  },
  {
    id: "10",
    title: "Who’s Afraid of Modern Art: Vandalism, Video Games, and Fascism",
    subtitle: "Jacob Geller",
    youtubeId: "v5DqmTtCPiQ",
    description: "",
  },
  {
    id: "11",
    title: "The Danger of a Single Story",
    subtitle: "Chimamanda Ngozi Adichie",
    youtubeId: "D9Ihs241zeg",
    description: "",
  },
  {
    id: "12",
    title: "Really Achieving Your Childhood Dreams (The Last Lecture)",
    subtitle: "Randy Pausch",
    youtubeId: "ji5_MqicxSo",
    description: "",
  },
  {
    id: "13",
    title: "This is Water",
    subtitle: "David Foster Wallace",
    youtubeId: "DCbGM4mqEVw",
    description: "",
  },
  {
    id: "14",
    title: "The overview effect",
    subtitle: "Crosspollinate",
    youtubeId: "CHMIfOecrlo",
    description: "",
  },
  {
    id: "15",
    title: "Is success Luck or Hard work?",
    subtitle: "Veritasium",
    youtubeId: "3LopI4YeC4I",
    description: "Bad luck is much easier to spot than good luck.",
  },
  {
    id: "16",
    title: "The Evolution Of Intelligence",
    subtitle: "Art of the Problem",
    youtubeId: "5EcQ1IcEMFQ",
    description: "Human intelligence ended with language, while llms begin with language.",
  },
  {
    id: "17",
    title: "Let's Go Whaling: Tricks for Monetising Mobile Game Players",
    subtitle: "PocketGamer.biz",
    youtubeId: "xNjI03CGkb4",
    description: "This one is niche. Watch if you've ever spent on a mobile game.",
  },
];


const YoutubePage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
      style={{ paddingLeft: "16px", paddingRight: "16px" }}
    >
      <div className="w-full max-w-5xl">
        <div className="space-y-4 text-left mb-12 mt-24">
          <h1 className="text-5xl font-bold mb-12 px-4">Videos that changed my perspective.</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed px-4">
            In the age of the internet, we don't need to go through a lifetime of hardship to be able to attain transformative wisdom. These are videos that either have been influencial in my view of the world, or videos that I believe many could benefit from watching.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto"
          style={{ maxWidth: "1024px" }}
        >
          {videoData.map((video, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-gray-800"
              style={{ width: "100%", maxWidth: "512px", margin: "0 auto" }}
            >
              <div className="w-full aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.subtitle}</p>
                <p className="text-sm text-gray-300 mt-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YoutubePage;
