import React, { useState, useEffect } from "react";
import data from "../../utils/24table.json";

const TwentyFour = () => {
  const [currentEntry, setCurrentEntry] = useState(getRandomEntry());
  const [userExpression, setUserExpression] = useState("");
  const [message, setMessage] = useState("");

  function getRandomEntry() {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  const handleInputChange = (e) => {
    setUserExpression(e.target.value);
  };

  const validateExpression = () => {
    const { numbers, solution } = currentEntry;
    const sanitizedInput = userExpression.replace(/\s+/g, ""); 

    if (!/^[0-9+\-*/()]+$/.test(sanitizedInput)) {
      setMessage("Invalid characters in expression.");
      return;
    }

    const inputNumbers = sanitizedInput.match(/[0-9]+/g) || [];
    const inputNumbersCount = inputNumbers.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    const providedNumbersCount = numbers.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    const isValidCount = Object.keys(providedNumbersCount).every((num) => {
      return providedNumbersCount[num] === inputNumbersCount[num];
    });

    if (!isValidCount) {
      setMessage("You can only use each number exactly once.");
      return;
    }

    try {
      const result = eval(sanitizedInput);

      if (result === 24) {
        setMessage("Correct! Good job!");
      } else {
        setMessage(`Incorrect expression. Yours evaluates to ${result}`);
      }
    } catch (err) {
      setMessage("Invalid expression.");
    }
  };

  const handleNext = () => {
    setCurrentEntry(getRandomEntry());
    setUserExpression("");
    setMessage("");
  };

  const handleShowAnswer = () => {
    setMessage(`Correct Answer: ${currentEntry.solution}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-5xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-4 text-center">Math Game 24</h1>

        <p className="text-lg mb-4 text-center">
          Use the expression below with operations (+, -, *, /).
        </p>

        <p className="text-center mt-4 mb-4">
          <strong>Numbers: {currentEntry.numbers.join(", ")}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter your expression"
          value={userExpression}
          onChange={handleInputChange}
          className="w-full mt-6 bg-gray-700 text-center text-2xl p-4 rounded-lg shadow"
        />

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={validateExpression}
            className="bg-blue-600 px-6 py-2 rounded-lg shadow"
          >
            Submit
          </button>


          <button
            onClick={handleShowAnswer}
            className="bg-yellow-600 px-6 py-2 rounded-lg shadow"
          >
            Show Answer
          </button>
          <button
            onClick={handleNext}
            className="bg-green-600 px-6 py-2 rounded-lg shadow"
          >
            Next
          </button>
        </div>

        <p className="mt-6 text-center text-yellow-400">{message}</p>
      </div>
    </div>
  );
};

export default TwentyFour;
