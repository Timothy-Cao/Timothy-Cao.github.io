import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const questionBankUrl =
  "https://raw.githubusercontent.com/EricAndrechek/FermiQuestions/main/question-bank.json";

const FermiQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [points, setPoints] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(questionBankUrl);
        const data = await response.json();
        const rawQuestions = data.questions;
        const questionArray = [];
        for (const source in rawQuestions) {
          for (const q in rawQuestions[source]) {
            const answer = rawQuestions[source][q];
            if (answer >= -40 && answer <= 40) {
              questionArray.push({
                question: q,
                answer: answer,
                source: source,
              });
            }
          }
        }
        shuffleArray(questionArray);
        setQuestions(questionArray);
        if (questionArray.length > 0) {
          setCurrentQuestion(questionArray.pop());
        }
      } catch (error) {
        console.error("Error fetching Fermi questions:", error);
      }
    };
  
    fetchQuestions();
  }, []);
  

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const renderQuestion = (text) => {
    const regex = /<sup>(.*?)<\/sup>|<sub>(.*?)<\/sub>/g;
    const parts = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, supValue, subValue] = match;

      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (supValue) {
        parts.push(<InlineMath key={match.index}>{`^{${supValue}}`}</InlineMath>);
      } else if (subValue) {
        parts.push(<InlineMath key={match.index}>{`_{${subValue}}`}</InlineMath>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const formatDecimalValue = (exponent) => {
    if (exponent >= 0) {
      return Number(10 ** exponent).toLocaleString("en-US");
    } else {
      return (10 ** exponent).toFixed(Math.abs(exponent));
    }
  };

  const checkAnswer = () => {
    const correctAnswer = currentQuestion.answer;
    const userDifference = Math.abs(correctAnswer - sliderValue);

    let message = "";
    let pointsAwarded = 0;

    if (userDifference === 0) {
      message = "Correct! 5 points!";
      pointsAwarded = 5;
    } else if (userDifference === 1) {
      message = `Just 1 off! 3 points. The correct answer was ${correctAnswer}.`;
      pointsAwarded = 3;
    } else if (userDifference === 2) {
      message = `2 off! 1 point. The correct answer was ${correctAnswer}.`;
      pointsAwarded = 1;
    } else {
      message = `${userDifference} off! The correct answer was ${correctAnswer}.`;
    }

    setPoints((prevPoints) => prevPoints + pointsAwarded);
    setResultMessage(message);

    if (questions.length > 0) {
      setCurrentQuestion(questions.pop());
      setQuestionNumber((prevNumber) => prevNumber + 1);
      setSliderValue(0);
    } else {
      setResultMessage(
        "You've gone through all the Fermi questions! Refresh the page to play again."
      );
      setCurrentQuestion(null);
    }
  };

  const handleSliderChange = (event, value) => {
    setSliderValue(value);
  };
  return (
    <Box
      className="flex flex-col items-center justify-center bg-gray-800 text-white rounded-lg p-6"
      style={{
        width: "calc(100vw - 20vw)",
        height: "calc(100vh - 30vh)",
        maxHeight: "calc(100vh - 30vh)",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {currentQuestion ? (
        <>
          <Typography variant="h5" className="mb-4 text-center">
            {renderQuestion(currentQuestion.question)}
          </Typography>
  
          <Box
            className="flex items-center justify-center mt-6"
            style={{
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" style={{ marginBottom: "8px" }}>
              <InlineMath>{`10^{${sliderValue}}`}</InlineMath>
            </Typography>
  
            <Box
              style={{
                minHeight: "80px", 
                lineHeight: "24px",
                wordBreak: "break-word",
                whiteSpace: "normal",
                textAlign: "center",
                paddingTop: "8px",
                paddingBottom: "8px",
              }}
            >
              <Typography variant="h6">
                {formatDecimalValue(sliderValue)}
              </Typography>
            </Box>
  
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              step={1}
              marks
              min={-40}
              max={40}
              valueLabelDisplay="off"
              style={{
                color: "#53d8fb",
                marginTop: "15px",
                width: "100%",
              }}
            />
          </Box>
  
          <Button
            variant="contained"
            color="primary"
            onClick={checkAnswer}
            style={{
              backgroundColor: "#53d8fb",
              color: "#000",
              marginTop: "24px",
              padding: "12px 24px",
              fontSize: "16px",
              marginBottom: "24px",
            }}
          >
            Submit
          </Button>
  
          <Typography variant="body2" className="mt-8 text-center">
            {resultMessage}
          </Typography>
          <Typography variant="body2" className="mt-2 text-center">
            Points: {points}
          </Typography>
          <Typography variant="body2" className="mt-1 text-center">
            Question {questionNumber + 1} / {questions.length + 1}
          </Typography>
        </>
      ) : (
        <Typography variant="h6" className="text-center">
          No more questions available. Refresh to try again.
        </Typography>
      )}
    </Box>
  );
  
};

export default FermiQuestions;
