import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "katex/dist/katex.min.css";
import numProperties from "./num_properties.json"; 

const MathWho = () => {
  const [mysteryNumber, setMysteryNumber] = useState(null);
  const [guess, setGuess] = useState("");
  const [properties, setProperties] = useState({});
  const [guesses, setGuesses] = useState([]);
  const [resultMessage, setResultMessage] = useState("");
  const [remainingGuesses, setRemainingGuesses] = useState(7);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 100) + 1;
    setMysteryNumber(randomIndex);
    setProperties(numProperties[randomIndex]);
  }, []);

  const checkGuess = (userGuess) => {
    const guessProperties = numProperties[userGuess];
    let feedback = [];

    Object.keys(guessProperties).forEach((property) => {
      feedback.push({
        property,
        isCorrect: guessProperties[property] === properties[property],
      });
    });

    const isCorrect = feedback.every((item) => item.isCorrect);
    if (isCorrect) {
      setResultMessage(`You win! The number was ${mysteryNumber}. Your winning guess was ${userGuess}`);
      setGameOver(true);
    } else if (remainingGuesses === 1) {
      setResultMessage(`Game over! The number was ${mysteryNumber}.`);
      setGameOver(true);
    } else {
      setResultMessage("");
    }

    setGuesses((prevGuesses) => [
      ...prevGuesses,
      { guess: userGuess, feedback }
    ]);
    setRemainingGuesses((prev) => prev - 1);
  };

  const handleGuessChange = (event) => {
    const value = event.target.value;
    if (value === "" || (Number(value) >= 1 && Number(value) <= 100)) {
      setGuess(value);
    }
  };

  const handleSubmit = () => {
    if (guess) {
      checkGuess(Number(guess));
      setGuess("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handlePlayAgain = () => {
    setGameOver(false);
    setGuesses([]);
    setRemainingGuesses(7);
    setResultMessage("");
    const randomIndex = Math.floor(Math.random() * 100) + 1;
    setMysteryNumber(randomIndex);
    setProperties(numProperties[randomIndex]);
  };

  return (
    <Box
      className="flex flex-col items-center bg-gray-800 text-white rounded-lg p-6"
      style={{
        width: "calc(100vw - 20vw)",
        height: "calc(100vh - 35vh)",
        maxHeight: "calc(100vh - 30vh)",
        maxWidth: "700px",
        margin: "20px auto 0 auto", 
        alignItems: "center", 
      }}
    >

      <Typography variant="h5" className="mb-4 text-center">
        Guess the Mystery Number
      </Typography>
      <br />

      <Typography variant="body2" className="text-center mb-4">
        Guess the number (1-100) in 7 guesses! Green means your guess and number agrees on the property. 
      </Typography>

      {!gameOver && (
        <Box className="flex items-center justify-center mt-6">
          <Typography variant="h6" className="mr-2">Guess : &nbsp;</Typography>
          <input
            type="number"
            value={guess}
            onChange={handleGuessChange}
            onKeyPress={handleKeyPress}
            min="1"
            max="100"
            style={{
              padding: "10px",
              fontSize: "16px",
              textAlign: "center",
              width: "50px",
              backgroundColor: "black",
              color: "white",
              marginRight: "10px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#53d8fb",
              color: "#fff",
              padding: "12px 24px",
              fontSize: "16px",
            }}
          >
            Submit
          </Button>
        </Box>
      )}

      {gameOver && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePlayAgain}
          style={{
            backgroundColor: "#53d8fb",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Play Again
        </Button>
      )}

      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "10px",
          width: "100%",
          marginTop: "20px",
          overflowX: "auto",
        }}
      >
        {guesses.length > 0 && (
          <>
            <Typography variant="body2" style={{ textAlign: "center" }}>Guess</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>Prime</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>Divisible by 3</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>Product of 3 primes</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>Perfect Square</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>Greater than 50</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>Digits Sum to 14</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>Fibonacci Number</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>Triangle Number</Typography>
            <Typography variant="body2" style={{ textAlign: "center" }}>100 - N is Prime</Typography>
          </>
        )}

        {guesses.map((guessData) => (
          <>
            <Typography variant="body2" style={{ textAlign: "center" }}>{guessData.guess}</Typography>
            {guessData.feedback.map((feedback) => (
              <div
                key={feedback.property}
                style={{
                  backgroundColor: feedback.isCorrect ? "green" : "red",
                  width: "100%",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
              />
            ))}
          </>
        ))}
      </Box>

      <Typography variant="body2" className="mt-8 text-center">
        {resultMessage}
      </Typography>
    </Box>
  );
};

export default MathWho;
