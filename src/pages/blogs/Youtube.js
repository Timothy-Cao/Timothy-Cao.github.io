import React, { useState } from "react";

const videoData = [
  {
    id: "1",
    title: "Why Math is Beautiful",
    subtitle: "Veritasium",
    youtubeId: "sXpbONjV1Jc",
    description: "A thoughtful dive into how math explains the world around us.",
  },
  {
    id: "2",
    title: "The Most Satisfying Video",
    subtitle: "SmarterEveryDay",
    youtubeId: "5GWhB1eAW4c",
    description: "Why symmetry and physics bring joy to our senses.",
  },
  // Add more videos as needed
];

const YoutubePage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
      style={{ paddingLeft: "16px", paddingRight: "16px" }}
    >
      <div className="w-full max-w-5xl">
        <div className="space-y-4 text-left mb-12 mt-24">
          <h1 className="text-5xl font-bold mb-12 px-4">Thoughtful Videos</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed px-4">
            A curated collection of video essays and discussions that I find thought-provoking and worth revisiting.
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
