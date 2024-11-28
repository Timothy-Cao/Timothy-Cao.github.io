import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FermiQuestions from "../../utils/FermiQuestions";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const puzzles = [
  {
    title: "Fermi Questions",
    description: (
      <>
        Fermi Questions are about estimating with limited info. <br /> <br />
        Provide answers in powers of 10. Aim to be within one order of magnitude of the correct value.
      </>
    ),
    type: "fermi",
  },
  {
    title: "Tetris Puzzle",
    description:
      <>A Perfect Clear (PC) is when a player fully eliminates all squares on the board.  <br /> <br />Can you visualize a solution?</>,
    type: "image",
    puzzle: "/assets/media/puzzles/tetris_puzzle1.png",
    solution: "/assets/media/puzzles/tetris_solution.gif",
    tryItUrl: "https://jstris.jezevec10.com/?play=6&map=51132",
  },
  {
    title: "Chess Puzzle",
    description: <>Black to move.  <br /> <br /> Hint: Backrank Mate</>,
    type: "image",
    puzzle: "/assets/media/puzzles/chess_puzzle1.png",
    solution: "/assets/media/puzzles/chess_solution.gif",
    tryItUrl: "https://www.chess.com/analysis/game/pgn/2a6hN7ka86?tab=analysis",
  },
  {
    title: "Chameleon Puzzle",
    description:
      <>There are 13 Red, 15 Green, and 17 Blue Chameleons. If two chameleons of different colors meet, both change to the third color.  <br /> <br />
      Is it ever possible for all chameleons to become the same color? </>,
    type: "text",
  },
  {
    title: "Handshake Puzzle",
    description:
      <>Jim and his wife Pam met with 4 other couples at a bar. Some people shook hands with each other. No one shook hands with their own spouse. 
      Jim asks everyone else how many hands they shook and gets nine different answers. <br /> <br /> How many hands did Pam shake?</>,
    type: "text",
  },
  {
    title: "One of Every digit",
    description: (
      <>
        Find an integer <InlineMath>N</InlineMath> such that{" "}
        <InlineMath>N^2</InlineMath> and <InlineMath>N^3</InlineMath> collectively contain
        exactly one copy of every digit (in base 10).  <br />  <br /> Bonus: Which bases do not have a solution?
      </>
    ),
    type: "text",
  },
];

const PuzzlesPage = () => {
  const [open, setOpen] = useState(false);
  const [activePuzzle, setActivePuzzle] = useState(null);

  const handleOpen = (puzzle) => {
    setActivePuzzle(puzzle);
    setOpen(true);
  };

  const handleClose = () => {
    setActivePuzzle(null);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-5xl">
        <Typography variant="h3" className="mb-6 text-gray-100">
          Brain Teasers
        </Typography>
        <Typography variant="subtitle1" className="mb-8 text-gray-300">
          For those with itchy brains. 
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {puzzles.map((puzzle, index) => (
            <div
              key={index}
              className="cursor-pointer bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-transform hover:scale-105"
              style={{ aspectRatio: "1 / 1" }}
              onClick={() => handleOpen(puzzle)}
            >
              <Typography variant="h6" className="text-gray-100 mb-2">
                {puzzle.title}
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                {puzzle.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      {activePuzzle && (
        <Modal open={open} onClose={handleClose}>
          <Box
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-lg shadow-lg"
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              overflow: "auto",
              padding: "24px",
              color: "white",
            }}
          >
            <Typography
              variant="h5"
              style={{
                marginBottom: "10px",
              }}
            >
              {activePuzzle.title}
            </Typography>
            {activePuzzle.type === "text" ? (
              <Typography variant="body2" className="text-gray-300 mb-6">
                {activePuzzle.description}
              </Typography>
            ) : activePuzzle.type === "fermi" ? (
              <FermiQuestions />
            ) : activePuzzle.type === "image" && (
              <>
                <img
                  src={activePuzzle.puzzle}
                  alt={activePuzzle.title}
                  className="w-full max-w-md mx-auto mb-6"
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    setActivePuzzle((prev) => ({
                      ...prev,
                      puzzle:
                        prev.puzzle === activePuzzle.puzzle
                          ? activePuzzle.solution
                          : activePuzzle.puzzle,
                    }))
                  }
                  style={{ marginRight: "8px" }}
                >
                  {activePuzzle.puzzle === activePuzzle.solution
                    ? "Hide Solution"
                    : "Show Solution"}
                </Button>
                {activePuzzle.tryItUrl && (
                  <Button
                    variant="contained"
                    color="primary"
                    href={activePuzzle.tryItUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try it Yourself
                  </Button>
                )}
              </>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default PuzzlesPage;
