import React, { useState, useEffect, useRef } from "react";

const questionBankUrl = "https://raw.githubusercontent.com/EricAndrechek/FermiQuestions/main/question-bank.json";

const FermiQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [points, setPoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [dialValue, setDialValue] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [previousResult, setPreviousResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef(null);
  const lastAngleRef = useRef(0);

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
              // Filter out questions that would exceed 5 lines
              if (estimateTextLines(q) <= 5) {
                questionArray.push({
                  question: q,
                  answer: answer,
                  source: source,
                });
              }
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
    if (!text) return "";
    return text.replace(/<sup>(.*?)<\/sup>/g, "^$1").replace(/<sub>(.*?)<\/sub>/g, "_$1");
  };

  const estimateTextLines = (text, fontSize = 14, containerWidth = 400) => {
    if (!text) return 0;
    const renderedText = renderQuestion(text);
    const avgCharWidth = fontSize * 0.6; // Approximate character width
    const charsPerLine = Math.floor(containerWidth / avgCharWidth);
    return Math.ceil(renderedText.length / charsPerLine);
  };

  const formatDecimalValue = (exponent) => {
    if (exponent >= 0) {
      return Number(10 ** exponent).toLocaleString("en-US");
    } else {
      return (10 ** exponent).toFixed(Math.abs(exponent));
    }
  };

  const getAngleFromPoint = (centerX, centerY, pointX, pointY) => {
    const dx = pointX - centerX;
    const dy = pointY - centerY;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return (angle + 360) % 360;
  };

  const handleDialStart = (e) => {
    setIsDragging(true);
    const dial = dialRef.current;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
    
    lastAngleRef.current = getAngleFromPoint(centerX, centerY, clientX, clientY);
  };

  const handleDialMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const dial = dialRef.current;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
    
    const currentAngle = getAngleFromPoint(centerX, centerY, clientX, clientY);
    let angleDiff = currentAngle - lastAngleRef.current;
    
    // Handle crossing 0/360 boundary
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    
    const valueChange = Math.round(angleDiff / 14.4); // 1440 degrees = 100 units (four full rotations)
    
    if (valueChange !== 0) {
      setDialValue(prev => Math.max(-50, Math.min(50, prev + valueChange)));
      lastAngleRef.current = currentAngle;
    }
  };

  const handleDialEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => handleDialMove(e);
    const handleMouseUp = () => handleDialEnd();
    const handleTouchMove = (e) => handleDialMove(e);
    const handleTouchEnd = () => handleDialEnd();

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const checkAnswer = () => {
    const correctAnswer = currentQuestion.answer;
    const userDifference = Math.abs(correctAnswer - dialValue);
    
    setMaxPossiblePoints(prev => prev + 5);
    
    let pointsAwarded = 0;
    if (userDifference === 0) {
      pointsAwarded = 5;
    } else if (userDifference === 1) {
      pointsAwarded = 3;
    } else if (userDifference === 2) {
      pointsAwarded = 1;
    }

    setPoints(prev => prev + pointsAwarded);
    
    // Set previous result for display
    setPreviousResult({
      question: currentQuestion.question,
      userAnswer: dialValue,
      correctAnswer: correctAnswer,
      pointsAwarded: pointsAwarded
    });

    let message = "";
    if (userDifference === 0) {
      message = "Perfect! 5 points!";
    } else if (userDifference === 1) {
      message = "Close! 3 points!";
    } else if (userDifference === 2) {
      message = "Not bad! 1 point!";
    } else {
      message = "Keep trying!";
    }
    setResultMessage(message);

    // Move to next question
    if (questions.length > 0) {
      setCurrentQuestion(questions.pop());
      setQuestionNumber(prev => prev + 1);
      setDialValue(0);
    } else {
      setCurrentQuestion(null);
    }
  };

  const dialRotation = (dialValue / 100) * 1440; // Four full rotations for full range

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 text-white p-2 gap-2">
      <div className="lg:w-80 bg-gray-800 rounded-lg p-3 flex-shrink-0">
        <h2 className="text-lg font-bold mb-2">Score</h2>
        <div className="text-2xl font-bold text-blue-400 mb-1">
          {points}/{maxPossiblePoints}
        </div>
        <div className="text-sm text-gray-400 mb-2">
          Question {questionNumber + 1}
        </div>
        {maxPossiblePoints > 0 && (
          <div className="mb-3">
            <div className="text-sm text-gray-400 mb-1">Accuracy</div>
            <div className="text-lg font-semibold">
              {Math.round((points / maxPossiblePoints) * 100)}%
            </div>
          </div>
        )}
        
        <hr className="border-gray-600 mb-2" />
        
        <h3 className="text-lg font-bold mb-2">Previous Question</h3>
        {previousResult ? (
          <div className="space-y-2">
            <div className="text-xs text-gray-300 overflow-hidden" style={{height: "6em", lineHeight: "1.2em"}}>
              {renderQuestion(previousResult.question)}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-gray-400 text-xs mb-1">Your Answer</div>
                <div className="text-blue-400 font-semibold">10<sup>{previousResult.userAnswer}</sup></div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Correct Answer</div>
                <div className="text-green-400 font-semibold">10<sup>{previousResult.correctAnswer}</sup></div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Points Earned</div>
                <div className="text-yellow-400 font-semibold">{previousResult.pointsAwarded}/5</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Difference</div>
                <div className="text-gray-300 font-semibold">{Math.abs(previousResult.correctAnswer - previousResult.userAnswer)}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            Complete a question to see results here
          </div>
        )}
      </div>

      <div className="flex-1 bg-gray-800 rounded-lg p-3 flex flex-col items-center">
        {currentQuestion ? (
          <div className="flex flex-col items-center w-full max-w-2xl">
            <div className="relative mb-3">
              <svg
                ref={dialRef}
                width="160"
                height="160"
                className="cursor-pointer select-none"
                onMouseDown={handleDialStart}
                onTouchStart={handleDialStart}
                style={{ touchAction: "none" }}
              >
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="#374151"
                  stroke="#6b7280"
                  strokeWidth="2"
                />
                
                {Array.from({ length: 20 }, (_, i) => {
                  const angle = (i / 20) * 360;
                  const isMainTick = i % 5 === 0;
                  const tickLength = isMainTick ? 12 : 6;
                  const x1 = 80 + Math.cos((angle - 90) * Math.PI / 180) * (60 - tickLength);
                  const y1 = 80 + Math.sin((angle - 90) * Math.PI / 180) * (60 - tickLength);
                  const x2 = 80 + Math.cos((angle - 90) * Math.PI / 180) * 60;
                  const y2 = 80 + Math.sin((angle - 90) * Math.PI / 180) * 60;
                  
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#9ca3af"
                      strokeWidth={isMainTick ? "2" : "1"}
                    />
                  );
                })}
                
                <line
                  x1="80"
                  y1="80"
                  x2={80 + Math.cos((dialRotation - 90) * Math.PI / 180) * 45}
                  y2={80 + Math.sin((dialRotation - 90) * Math.PI / 180) * 45}
                  stroke="#53d8fb"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                
                <circle cx="80" cy="80" r="6" fill="#53d8fb" />
              </svg>
            </div>

            <div className="text-center mb-3">
              <div className="text-xl font-bold mb-1">
                10<sup>{dialValue}</sup>
              </div>
              <div className="h-8 flex items-center justify-center text-sm text-gray-300 break-all px-2">
                {formatDecimalValue(dialValue)}
              </div>
            </div>

            <button
              onClick={checkAnswer}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-semibold transition-colors mb-4"
            >
              Submit Answer
            </button>

            {resultMessage && (
              <div className="mb-4 text-center">
                <div className="text-base font-semibold">{resultMessage}</div>
              </div>
            )}

            <div className="text-center px-2" style={{height: "6em", lineHeight: "1.2em"}}>
              <div className="text-sm text-gray-200 leading-relaxed overflow-hidden">
                {renderQuestion(currentQuestion.question)}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl mb-4">Game Complete!</h3>
            <div className="text-lg">Final Score: {points}/{maxPossiblePoints}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FermiQuestions;