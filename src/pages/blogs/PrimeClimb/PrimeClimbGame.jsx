import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { random } from "lodash";

const calculateLegalMoves = (pawnPosition, diceValue) => {
  const operations = [
    (pos, die) => pos + die,
    (pos, die) => pos - die,
    (pos, die) => pos * die,
    (pos, die) => (die !== 0 && pos % die === 0 ? pos / die : null),
  ];

  return Array.from(
    new Set(
      operations
        .map((op) => op(pawnPosition, diceValue))
        .filter((result) => result !== null && result >= 0 && result <= 101)
    )
  );
};

const PrimeClimb = () => {
  const [board, setBoard] = useState(
    Array.from({ length: 102 }, (_, index) => index)
  );
  const [pawns, setPawns] = useState([0, 0]);
  const [diceRolls, setDiceRolls] = useState([null, null]);
  const [selectedPawn, setSelectedPawn] = useState(null);
  const [selectedDie, setSelectedDie] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameState, setGameState] = useState("NeedToRollDice");
  const [turnCount, setTurnCount] = useState(0);

  const handleStartGame = () => {
    setPawns([0, 0]);
    setDiceRolls([null, null]);
    setSelectedPawn(null);
    setSelectedDie(null);
    setLegalMoves([]);
    setIsGameStarted(true);
    setGameState("NeedToRollDice");
    setTurnCount(0);
  };

  const handleRestartGame = () => {
    setPawns([0, 0]);
    setDiceRolls([null, null]);
    setSelectedPawn(null);
    setSelectedDie(null);
    setLegalMoves([]);
    setIsGameStarted(false);
    setGameState("NeedToRollDice");
    setTurnCount(0);
  };

  const rollDice = () => {
    if (diceRolls.every((roll) => roll !== null)) return;

    const rolls = [random(1, 10), random(1, 10)];
    setDiceRolls(rolls);
    setGameState("SelectMoves");
    setSelectedPawn(null);
    setSelectedDie(null);
    setLegalMoves([]);
    setTurnCount(turnCount + 1);
  };

  const handlePawnSelection = (index) => {
    setSelectedPawn(index);
    if (selectedDie !== null) {
      updateLegalMoves(index, selectedDie);
    }
  };

  const handleDieSelection = (index) => {
    setSelectedDie(index);
    updateLegalMoves(selectedPawn, index);
  };

  const updateLegalMoves = (pawnIndex, dieIndex) => {
    const moves = calculateLegalMoves(pawns[pawnIndex], diceRolls[dieIndex]);
    setLegalMoves(moves);
  };

  const handleMove = (move) => {
    if (!legalMoves.includes(move)) return;

    const newPawns = [...pawns];
    newPawns[selectedPawn] = move;
    setPawns(newPawns);

    const newDiceRolls = [...diceRolls];
    newDiceRolls[selectedDie] = null;
    setDiceRolls(newDiceRolls);

    setSelectedPawn(null);
    setSelectedDie(null);
    setLegalMoves([]);

    if (newDiceRolls.every((roll) => roll === null)) {
      setGameState("NeedToRollDice");
    }

    if (newPawns.every((position) => position === 101)) {
      setGameState("Victory");
    }
  };

  if (!isGameStarted) {
    return (
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Prime Climb
        </Typography>
        <Button variant="contained" color="primary" onClick={handleStartGame} sx={{ mt: 4 }}>
          Start Game
        </Button>
      </Box>
    );
  }

  if (gameState === "Victory") {
    return (
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" color="success">
          🎉 Victory! Turns: {turnCount}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleRestartGame} sx={{ mt: 4 }}>
          Restart Game
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} px={2}>
        <Typography variant="h4">Prime Climb</Typography>
        <Button variant="outlined" color="secondary" onClick={handleRestartGame}>
          Restart Game
        </Button>
      </Box>

      <Box mt={2}>
        <Typography variant="h5">Game Board</Typography>
        <Grid container spacing={0} justifyContent="center">
          {board.map((value, index) => (
            <Grid item xs={1} key={index}>
              <Paper
                elevation={3}
                style={{
                  backgroundColor: pawns.includes(index)
                    ? index === 101
                      ? "#4caf50"
                      : "#ff5722"
                    : "#e0e0e0",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {value}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4} textAlign="center">
        {gameState === "NeedToRollDice" && (
          <Button
            variant="contained"
            color="primary"
            onClick={rollDice}
            sx={{ mt: 2 }}
          >
            Roll Dice
          </Button>
        )}

        {gameState === "SelectMoves" && (
          <>
            <Box display="flex" justifyContent="center" mt={2}>
              {diceRolls.map((roll, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={() => handleDieSelection(index)}
                  sx={{
                    margin: "0 8px",
                    height: 60,
                    color: "white",
                    backgroundColor: selectedDie === index ? "#06402b" : "#1976d2",
                  }}
                >
                  {roll ?? "USED"}
                </Button>
              ))}
            </Box>

            <Box display="flex" justifyContent="center" mt={2}>
              {pawns.map((position, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={() => handlePawnSelection(index)}
                  sx={{
                    margin: "0 8px",
                    height: 60,
                    color: "white",
                    backgroundColor: selectedPawn === index ? "#06402b" : "#1976d2",
                  }}
                >
                  Pawn {index + 1} : {position}
                </Button>
              ))}
            </Box>

            <Box mt={4}>
              {legalMoves.map((move, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="default"
                  onClick={() => handleMove(move)}
                  sx={{ margin: "0 8px" }}
                >
                  {move}
                </Button>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PrimeClimb;
