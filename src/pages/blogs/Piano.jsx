import React, { useState } from "react";

const youtubers = [
  {
    id: "0",
    name: "Birru",
    channel: "@javierbirruezo",
    description: "A wide variety of popular songs covers with classical influence",
    videos: ["XAOVr9hHYpM", "Xe2Pr4omHMs", "T_uWHh3h0gI", "-CfcdIWtqho"],
    genres: ["classical", "soundtrack", "pop"],
  },
  {
    id: "1",
    name: "Hakdo",
    channel: "@Hakdo_composer",
    channelUrl: "https://www.youtube.com/@Hakdo_composer",
    description: "",
    videos: ["YjHZdFpeO-k", "IJtl2kk3ePE", "Rg6JmvGhufw", "UW94FNf7Cms"],
    genres: ["classical", "modern"],
  },
  {
    id: "2",
    name: "Kyle",
    channel: "@kylelandry",
    channelUrl: "https://www.youtube.com/@kylelandry",
    description: "",
    videos: ["JOtDS0vRwxg", "AyhPxrchntM", "JOtDS0vRwxg", "9QG6vY2dYQE"],
    genres: ["video games", "movies"],
  },
  {
    id: "3",
    name: "지민도로시Jimindorothy",
    channel: "@Jimindorothy",
    channelUrl: "https://www.youtube.com/@Jimindorothy",
    description: "",
    videos: ["SHe_JGvEnZE", "BprQBx92LpY", "OK9uIiq28dQ", "9Blpd2knJN4"],
    genres: ["jazz", "Lo-fi"],
  },
  {
    id: "4",
    name: "Cateen",
    channel: "@cateen_hayatosumino",
    channelUrl: "https://www.youtube.com/@cateen_hayatosumino",
    description: "",
    videos: ["L2f6Mi7I5lY", "m-CHbKe88-8 ", "4JJFJsmliUU", "L-HgpAf-XRk"],
    genres: ["classical", "movies"],
  },
  {
    id: "5",
    name: "Rousseau",
    channel: "@Rousseau",
    channelUrl: "https://www.youtube.com/@Rousseau",
    description: "",
    videos: ["6El8B8hJ4Sg", "MBOa-2b4uQQ", "Zj_psrTUW_w", "ALqOKq0M6ho"],
    genres: ["classical", "modern"],
  },
  {
    id: "6",
    name: "Animenz",
    channel: "@Animenzzz",
    channelUrl: "https://www.youtube.com/@Animenzzz",
    description: "",
    videos: ["sEQf5lcnj_o", "JRQbVNzmCK0", "Pi8xsZXibIc", "OB8_wfxWSGs"],
    genres: ["anime", "classical"],
  },
  {
    id: "7",
    name: "TheIshter",
    channel: "@TehIshter",
    channelUrl: "https://www.youtube.com/@TehIshter",
    description: "",
    videos: ["GlfQDJnfgJE", "DjMkfARvGE8", "l4O9lB0A9ns", "uLFtmJlzKvE"],
    genres: ["anime", "video game"],
  },
  {
    id: "8",
    name: "LotusFlower",
    channel: "@LotusFlower",
    channelUrl: "https://www.youtube.com/@LotusFlower",
    description: "",
    videos: ["AaGSlJI8OSs", "KtgJafS4ieQ", "fLRqSbOUteQ", "Yki4smOSGOU"],
    genres: ["Videogame", "classical"],
  },
  {
    id: "9",
    name: "Bella and Lucas",
    channel: "@bellaandlucas",
    channelUrl: "https://www.youtube.com/@bellaandlucas",
    description: "",
    videos: ["yyIZOLKui8o", "oe2BFatHYxw", "u4QWXgj5KWk", "918YaC2a-So"],
    genres: ["duet", "OST"],
  },
  {
    id: "10",
    name: "ふぃくしのん / Phyxinon",
    channel: "@phyxinon",
    channelUrl: "https://www.youtube.com/@phyxinon",
    description: "",
    videos: ["4HggbTkjeQw", "olYJgKPaVF0", "gWz08eyyEBI", "4oPM8zTeois"],
    genres: ["videogame", "jpop"],
  },
];

const YoutuberSection = ({ youtuber, isOpen, toggleOpen }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <button
        className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-700 transition-colors"
        onClick={() => toggleOpen(youtuber.id)}
      >
        <div>
          <h3 className="text-xl font-semibold text-white">{youtuber.name}</h3>
          <a
            href={youtuber.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            {youtuber.channel}
          </a>
        </div>
        <span className="text-xl text-gray-300">{isOpen ? "-" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[3000px]" : "max-h-0"
        }`}
      >
        <div className="p-4 space-y-6">
          <p className="text-gray-300 leading-relaxed">{youtuber.description}</p>
          <div className="flex flex-wrap gap-2">
            {youtuber.genres.map((genre, i) => (
              <span
                key={i}
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar [scrollbar-width:thin] [scrollbar-color:#4b5563_#1f2937]">
            {youtuber.videos.map((videoId, index) => (
              <div
                key={index}
                className="flex-none w-80 rounded-md overflow-hidden shadow-md bg-gray-900 hover:shadow-lg transform transition-transform hover:scale-105"
              >
                <div className="w-full aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`Video ${index + 1} from ${youtuber.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PianoPage = () => {
  const [openTabId, setOpenTabId] = useState(null);

  const toggleOpen = (id) => {
    setOpenTabId(openTabId === id ? null : id);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen px-4 py-8">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937; /* gray-800 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563; /* gray-600 */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280; /* gray-500 */
        }
      `}</style>
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold mb-4">Piano YouTubers</h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          My secret piano page... Heres some of my favourite piano youtubers...
        </p>
        <div className="space-y-4">
          {youtubers.map((youtuber) => (
            <YoutuberSection
              key={youtuber.id}
              youtuber={youtuber}
              isOpen={openTabId === youtuber.id}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PianoPage;