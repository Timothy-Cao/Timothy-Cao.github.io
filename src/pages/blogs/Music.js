import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const compositions = [
    {
      title: "Dodoman's Theme",
      description:
        "Written in 2021 for symphonic orchestra. Inspired by Schubert's Ständchen.",
      type: "video",
      src: "https://www.youtube.com/embed/8N39upFgpts",
    },
    {
      title: "Journey of the Dodo",
      description: "2025, this symphonic piece features a horn and oboe-led melody",
      type: "audio",
      src: "/assets/media/audio/journey_of_the_dodo.mp3",
    },
    {
      title: "March Challenge",
      description: "Written in 2024, featuring piano and harp.",
      type: "audio",
      src: "/assets/media/audio/MarchRemixChallenge.mp3",
    },
    {
      title: "My September",
      description: "Written in 2023, for solo piano.",
      type: "audio",
      src: "/assets/media/audio/myseptember.mp3",
    },
    {
      title: "Test song (First taste of FL Studio",
      description: "Written in 2025.",
      type: "audio",
      src: "/assets/media/audio/First taste of FL Studio.mp3",
    },
    {
      title: "Ringtone challenge",
      description: "A little ms ost inspired ringtone challenge",
      type: "audio",
      src: "/assets/media/audio/ms_ringtone.mp3",
    },
    {
      title: "Bongo first",
      description: "Music was written around the bongo line",
      type: "audio",
      src: "/assets/media/audio/1hr_challenge.mp3", 
    },
    {
      title: "8 Bit Nostalgia",
      description: "Written in 2021, for solo piano (synth).",
      type: "audio",
      src: "/assets/media/audio/8_bit_nostalgia.mp3",
    },
    {
      title: "Three Hands",
      description: "Written in 2022, for piano (1.5) duet.",
      type: "audio",
      src: "/assets/media/audio/4hand_remix.mp3",
    },
    {
      title: "Game OST 4",
      description: "Written in 2020, for orchestra. Inspiration from Sonny.",
      type: "audio",
      src: "/assets/media/audio/Game_OST_4.mp3",
    },
    {
      title: "Sadge in C",
      description: "Written in 2019, for solo piano (synth).",
      type: "audio",
      src: "/assets/media/audio/sadgeC.mp3",
    },
    {
      title: "Pudding's Day Off",
      description: "Written in 2022, for solo piano.",
      type: "audio",
      src: "/assets/media/audio/Puddings_day_off.mp3",
    },
    {
      title: "Game OST 2",
      description: "Written in 2019, for orchestra.",
      type: "audio",
      src: "/assets/media/audio/Game_OST_3.mp3",
    },
    {
      title: "Violin Nostalgia",
      description: "Written in 2018, for violin and piano.",
      type: "audio",
      src: "/assets/media/audio/violin_nostalgia.mp3",
    },
    {
      title: "March of the Clowns",
      description: "Written in 2014, for wind quintet",
      type: "audio",
      src: "/assets/media/audio/March_of_the_clowns.mp3",
    },
  ];
  
const MusicPage = () => {
  const [open, setOpen] = useState(false);
  const [activeComposition, setActiveComposition] = useState(null);

  const handleOpen = (composition) => {
    setActiveComposition(composition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveComposition(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-5xl font-bold mb-8 mt-6">Musical Composition</h1>
        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
          Welcome to the musical corner. Sometimes I vibrate the air pleasantly. 
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compositions.map((comp, index) => (
            <div
              key={index}
              onClick={() => handleOpen(comp)}
              className="cursor-pointer bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {comp.title}
                {(comp.title === "Dodoman's Theme" || comp.title === "March Challenge" || comp.title === "My September" || comp.title === "Journey of the Dodo") && (
                  <span className="ml-2 text-yellow-400" title="Favourite">
                    ★
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-400">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>
      {activeComposition && (
        <Modal open={open} onClose={handleClose}>
          <Box
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-lg"
            style={{
                maxWidth: "200%",
                maxHeight: "auto%",
                minWidth: "400px", 
                minHeight: "auto", 
                overflow: "auto",
            }}
            >  
            <h2 className="text-xl font-bold text-white mb-4">
              {activeComposition.title}
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              {activeComposition.description}
            </p>
            {activeComposition.type === "audio" ? (
              <audio
                controls
                src={activeComposition.src}
                className="w-full"
                autoPlay
              />
            ) : (
              <iframe
                src={activeComposition.src}
                title={activeComposition.title}
                className="w-full h-64 md:h-96"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default MusicPage;
