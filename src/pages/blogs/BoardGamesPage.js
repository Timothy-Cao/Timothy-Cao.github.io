import React from "react";
import { Link } from "react-router-dom";

const boardGames = [
    {
        title: "Prime Climb Algorithms",
        subtitle: "Statistical comparison of heuristic and strategic efficiency",
        href: "/blogs/prime-climb",
        image: "/assets/media/games/primeclimb.png",
    },
    {
        title: "Scrabble Trainer",
        subtitle: "Train your scrabble vision with the 1000 most likely scrabbles.",
        href: "/blogs/scrabble",
        image: "/assets/media/games/scrabble.png",
    },
    {
        title: "Math Game 24",
        subtitle: "Test your math speed with the card game 24 and its variants.",
        href: "/blogs/twenty-four",
        image: "/assets/media/games/24.png",
    },
    {
        title: "Solvability of Othello",
        subtitle: "Analysis of the game-tree complexity and PSPACE-complete decision problems",
        href: "/blogs/othello",
        image: "/assets/media/games/othello.png",
    },
];

const BoardGamesPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="space-y-4 text-left mb-12 mt-24">
          <h1 className="text-5xl font-bold mb-12">Board Games</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Strategy, Training, and Dissections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardGames.map((game, index) => (
            <Link
              key={index}
              to={game.href}
              className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-gray-700"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{game.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{game.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardGamesPage;
