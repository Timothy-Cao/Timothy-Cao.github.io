import React, { useState } from "react";

const videoData = [
  {
    id: "0",
    title: "Why the Modern World Promotes Mental Illness",
    subtitle: "Pursuit of Wonder",
    youtubeId: "-1FU04Hc8qg",
    description: "How should success be defined?",
  },
  {
    id: "1",
    title: "When Will I Ever Use Math?",
    subtitle: "Math The World",
    youtubeId: "RqQlXG__vGs",
    description: "This is what I show all my students.",
  },
  {
    id: "2",
    title: "State of The Dead Internet",
    subtitle: "Jules",
    youtubeId: "GELgKl_Wow8",
    description: "The golden age of the internet is behind us.",
  },
  {
    id: "3",
    title: "Why You Will Marry the Wrong Person",
    subtitle: "The School of Life",
    youtubeId: "-EvvPZFdjyk",
    description: "",
  },
  {
    id: "4",
    title: "The Debt Paradox",
    subtitle: "Art of the Problem",
    youtubeId: "bZ6HodKDxJE",
    description: "Very informative for those without economic backgrounds",
  },
  {
    id: "5",
    title: "What “Follow Your Dreams” Misses",
    subtitle: "3Blue1Brown",
    youtubeId: "W3I3kAg2J7w",
    description: "",
  },
  {
    id: "6",
    title: "The Egg - A Short Story",
    subtitle: "Kurzgesagt - In a Nutshell",
    youtubeId: "h6fcK_fRYaI",
    description: "",
  },
  {
    id: "7",
    title: "In Search of a Flat Earth",
    subtitle: "Folding Ideas",
    youtubeId: "JTfhYyTuT44",
    description: "This video delves into the psychology and motivations behind flat earth.",
  },
  {
    id: "8",
    title: "AlphaGo - The Movie | Full award-winning documentary",
    subtitle: "DeepMind",
    youtubeId: "WXuK6gekU1Y",
    description: "This is the documentary that influenced my career trajectory. Surprisingly moving.",
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
    title: "Who's Afraid of Modern Art: Vandalism, Video Games, and Fascism",
    subtitle: "Jacob Geller",
    youtubeId: "v5DqmTtCPiQ",
    description: "This will change your perspective on art",
  },
  {
    id: "11",
    title: "Witnessing the Death of American Capitalism",
    subtitle: "Benn Jordan",
    youtubeId: "gqtrNXdlraM",
    description: "",
  },
  {
    id: "12",
    title: "Really Achieving Your Childhood Dreams",
    subtitle: "Randy Pausch",
    youtubeId: "ji5_MqicxSo",
    description: "",
  },
  {
    id: "13",
    title: "This is Water",
    subtitle: "David Foster Wallace",
    youtubeId: "DCbGM4mqEVw",
    description: "Incredible perspective of the world and the human condition.",
  },
  {
    id: "14",
    title: "The overview effect",
    subtitle: "Crosspollinate",
    youtubeId: "CHMIfOecrlo",
    description: "A wonderful way to see our planet.",
  },
  {
    id: "15",
    title: "Is success Luck or Hard work?",
    subtitle: "Veritasium",
    youtubeId: "3LopI4YeC4I",
    description: "Bad luck is easier to spot than good luck.",
  },
  {
    id: "16",
    title: "The Evolution Of Intelligence",
    subtitle: "Art of the Problem",
    youtubeId: "5EcQ1IcEMFQ",
    description: "Human intelligence ended with language, while LLMs begin with language.",
  },
  {
    id: "17",
    title: "Wealth Inequality in America",
    subtitle: "Politizane",
    youtubeId: "QPKKQnijnsM",
    description: "",
  },
  {
    id: "18",
    title: "Let's Go Whaling: Tricks for Monetising Mobile Game Players",
    subtitle: "PocketGamer.biz",
    youtubeId: "xNjI03CGkb4",
    description: "Watch this if you spend money on mobile games.",
  },
  {
    id: "19",
    title: "AI 2027: A Realistic Scenario of AI Takeover",
    subtitle: "Documenting AGI",
    youtubeId: "k_onqn68GHY",
    description: "This one is almost entirely speculative but an interesting watch.",
  },
];

const YoutubePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4">
      <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-8 mt-6">Videos that changed my perspective.</h1>
        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
          In the age of the internet, we don't need to go through a lifetime of hardship to be able to attain transformative wisdom. These are videos that either have been influential in my view of the world, or videos that I believe many could benefit from watching.
        </p>

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
