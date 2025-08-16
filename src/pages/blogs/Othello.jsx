import React from "react";

const letters = ["C", "O", "M", "I", "N", "G", "S", "O", "O", "N"];

const Othello = () => {
  return (
  <div className="bg-gray-900 text-white px-4">
    <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-4 text-center">Othello - Under Construction</h1>
        <p className="text-lg text-gray-400 text-center mb-6">
         Game-tree complexity and PSPACE challenges.
        </p>

        <div className="grid grid-cols-6 gap-4 mt-8">
          {letters.map((letter, index) => (
            <div
              key={index}
              className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center text-4xl font-bold shadow hover:bg-gray-600 transform transition-transform"
            >
              {letter}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Othello;
