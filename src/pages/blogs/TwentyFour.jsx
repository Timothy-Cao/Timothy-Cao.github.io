import React, { useState, useEffect } from "react";
import data from "../../utils/24table.json";

const TwentyFour = () => {
  const [currentEntry, setCurrentEntry] = useState(getRandomEntry());
  const [userExpression, setUserExpression] = useState("");
  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);

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

    if (!/^[0-9+\-*/()]+$/.test(sanitizedInput) || sanitizedInput.includes("**") || sanitizedInput.includes("//")) {
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

    if (!isValidCount || Object.keys(inputNumbersCount).length !== Object.keys(providedNumbersCount).length) {
      setMessage("You must use each number exactly once");
      return;
    }

    try {
      const result = eval(sanitizedInput); 

      if (result === 24) {
        setMessage("Correct! Good job!");
      } else {
        setMessage(`Incorrect expression. Yours evaluates to ${result}.`);
      }
    } catch (err) {
      setMessage("Invalid mathematical expression.");
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

  const toggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  return (
  <div className="bg-gray-900 text-white px-4">
    <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-4 text-center flex items-center justify-center gap-2">
          Math Game
        </h1>

        <p className="text-lg mb-4 text-center flex items-center justify-center">
          Make 24 with the numbers with basic operations.
          <button
            className="ml-2 bg-gray-900 text-white rounded-full w-7 h-7 flex items-center justify-center text-m font-bold"
            onClick={toggleInfo}
          >
            ?
          </button>
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
            Check Answer
          </button>
          <button
            onClick={handleNext}
            className="bg-green-600 px-6 py-2 rounded-lg shadow"
          >
            Next
          </button>
        </div>

        <p className="mt-6 text-center text-yellow-400">{message}</p>

        {showInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-auto">
            <div className="p-8 bg-gray-800 rounded-lg mt-20 mx-auto max-w-md">
              <h2 className="text-2xl font-bold mb-4">How to play</h2>
              <p>
                1. Make an expression that evaluates to 24 exactly.
                <br></br><br></br>
                2. You can only use each number once. 
                <br></br><br></br>
                3. You can only use the basic 4 operations (+ - / *)
                <br></br><br></br>
                4. You can use any number of brackets.
                <br></br><br></br>
                E.g. (10-2)(9/3).
              </p>
              <button
                className="mt-6 p-2 bg-gray-600 rounded hover:bg-gray-500"
                onClick={toggleInfo}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwentyFour;
