import React, { useState, useEffect, useRef } from "react";

const QUESTION_BANK_URL =
  "https://raw.githubusercontent.com/EricAndrechek/FermiQuestions/main/question-bank.json";

const DIAL_RANGE = { min: -50, max: 50 };
const DIAL_DEGREES_PER_UNIT = 14.4; // 1440 degrees / 100 units
const DIAL_SIZE = 160;
const DIAL_CENTER = DIAL_SIZE / 2;
const DIAL_RADIUS = 60;

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
  const rendered = renderQuestion(text);
  const charsPerLine = Math.floor(containerWidth / (fontSize * 0.6));
  return Math.ceil(rendered.length / charsPerLine);
};

const formatDecimalValue = (exponent) => {
  if (exponent >= 0) return Number(10 ** exponent).toLocaleString("en-US");
  return (10 ** exponent).toFixed(Math.abs(exponent));
};

const getAngle = (cx, cy, px, py) => {
  const angle = Math.atan2(py - cy, px - cx) * (180 / Math.PI);
  return (angle + 360) % 360;
};

const getClientPos = (e) => {
  const isTouch = e.type.includes("touch");
  return {
    x: isTouch ? e.touches[0].clientX : e.clientX,
    y: isTouch ? e.touches[0].clientY : e.clientY,
  };
};

const ScorePanel = ({ points, maxPoints, questionNumber, previousResult }) => (
  <div className="lg:w-80 bg-gray-800 rounded-lg p-3 flex-shrink-0">
    <h2 className="text-lg font-bold mb-2">Score</h2>
    <div className="text-2xl font-bold text-blue-400 mb-1">{points}/{maxPoints}</div>
    <div className="text-sm text-gray-400 mb-2">Question {questionNumber + 1}</div>

    {maxPoints > 0 && (
      <div className="mb-3">
        <div className="text-sm text-gray-400 mb-1">Accuracy</div>
        <div className="text-lg font-semibold">{Math.round((points / maxPoints) * 100)}%</div>
      </div>
    )}

    <hr className="border-gray-600 mb-2" />
    <h3 className="text-lg font-bold mb-2">Previous Question</h3>

    {previousResult ? (
      <div className="space-y-2">
        <div className="text-xs text-gray-300 overflow-hidden h-[6em] leading-[1.2em]">
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
            <div className="text-gray-300 font-semibold">
              {Math.abs(previousResult.correctAnswer - previousResult.userAnswer)}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-gray-400 text-sm">Complete a question to see results here</div>
    )}
  </div>
);

const FermiQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [dialValue, setDialValue] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [previousResult, setPreviousResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef(null);
  const lastAngleRef = useRef(0);

  // Fetch and filter questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(QUESTION_BANK_URL);
        const data = await response.json();
        const raw = data.questions;
        const questionArray = [];

        for (const source in raw) {
          for (const q in raw[source]) {
            const answer = raw[source][q];
            if (answer >= -40 && answer <= 40 && estimateTextLines(q) <= 5) {
              questionArray.push({ question: q, answer, source });
            }
          }
        }

        shuffleArray(questionArray);
        setQuestions(questionArray);
        if (questionArray.length > 0) {
          setCurrentQuestion(questionArray[0]);
          setQuestionIndex(1);
        }
      } catch (error) {
        console.error("Error fetching Fermi questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Dial drag handling
  const handleDialStart = (e) => {
    setIsDragging(true);
    const rect = dialRef.current.getBoundingClientRect();
    const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    const pos = getClientPos(e);
    lastAngleRef.current = getAngle(center.x, center.y, pos.x, pos.y);
  };

  const handleDialMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const rect = dialRef.current.getBoundingClientRect();
    const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    const pos = getClientPos(e);
    const currentAngle = getAngle(center.x, center.y, pos.x, pos.y);

    let diff = currentAngle - lastAngleRef.current;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const valueChange = Math.round(diff / DIAL_DEGREES_PER_UNIT);
    if (valueChange !== 0) {
      setDialValue((prev) => Math.max(DIAL_RANGE.min, Math.min(DIAL_RANGE.max, prev + valueChange)));
      lastAngleRef.current = currentAngle;
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e) => handleDialMove(e);
    const onEnd = () => setIsDragging(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };
  }, [isDragging]);

  const checkAnswer = () => {
    const diff = Math.abs(currentQuestion.answer - dialValue);
    const awarded = diff === 0 ? 5 : diff === 1 ? 3 : diff === 2 ? 1 : 0;

    setMaxPossiblePoints((prev) => prev + 5);
    setPoints((prev) => prev + awarded);
    setPreviousResult({
      question: currentQuestion.question,
      userAnswer: dialValue,
      correctAnswer: currentQuestion.answer,
      pointsAwarded: awarded,
    });

    const messages = { 0: "Perfect! 5 points!", 1: "Close! 3 points!", 2: "Not bad! 1 point!" };
    setResultMessage(messages[diff] || "Keep trying!");

    if (questionIndex < questions.length) {
      setCurrentQuestion(questions[questionIndex]);
      setQuestionIndex((prev) => prev + 1);
      setQuestionNumber((prev) => prev + 1);
      setDialValue(0);
    } else {
      setCurrentQuestion(null);
    }
  };

  const dialRotation = (dialValue / 100) * 1440;
  const toRad = (deg) => ((deg - 90) * Math.PI) / 180;

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 text-white p-2 gap-2">
      <ScorePanel
        points={points}
        maxPoints={maxPossiblePoints}
        questionNumber={questionNumber}
        previousResult={previousResult}
      />

      <div className="flex-1 bg-gray-800 rounded-lg p-3 flex flex-col items-center">
        {currentQuestion ? (
          <div className="flex flex-col items-center w-full max-w-2xl">
            {/* Dial */}
            <div className="relative mb-3">
              <svg
                ref={dialRef}
                width={DIAL_SIZE}
                height={DIAL_SIZE}
                className="cursor-pointer select-none"
                onMouseDown={handleDialStart}
                onTouchStart={handleDialStart}
                style={{ touchAction: "none" }}
              >
                <circle cx={DIAL_CENTER} cy={DIAL_CENTER} r={DIAL_RADIUS} fill="#374151" stroke="#6b7280" strokeWidth="2" />
                {Array.from({ length: 20 }, (_, i) => {
                  const angle = (i / 20) * 360;
                  const isMain = i % 5 === 0;
                  const len = isMain ? 12 : 6;
                  return (
                    <line
                      key={i}
                      x1={DIAL_CENTER + Math.cos(toRad(angle)) * (DIAL_RADIUS - len)}
                      y1={DIAL_CENTER + Math.sin(toRad(angle)) * (DIAL_RADIUS - len)}
                      x2={DIAL_CENTER + Math.cos(toRad(angle)) * DIAL_RADIUS}
                      y2={DIAL_CENTER + Math.sin(toRad(angle)) * DIAL_RADIUS}
                      stroke="#9ca3af"
                      strokeWidth={isMain ? "2" : "1"}
                    />
                  );
                })}
                <line
                  x1={DIAL_CENTER}
                  y1={DIAL_CENTER}
                  x2={DIAL_CENTER + Math.cos(toRad(dialRotation)) * 45}
                  y2={DIAL_CENTER + Math.sin(toRad(dialRotation)) * 45}
                  stroke="#53d8fb"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx={DIAL_CENTER} cy={DIAL_CENTER} r="6" fill="#53d8fb" />
              </svg>
            </div>

            {/* Value display */}
            <div className="text-center mb-3">
              <div className="text-xl font-bold mb-1">10<sup>{dialValue}</sup></div>
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

            <div className="text-center px-2 h-[6em] leading-[1.2em]">
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
