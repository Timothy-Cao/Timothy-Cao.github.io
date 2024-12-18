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

    // valid characters check
    if (!/^[0-9+\-*/()]+$/.test(sanitizedInput)) {
      setMessage("Invalid characters in expression.");
      return;
    }

    // all numbers are present check
    const numPresenceCheck = numbers.every((num) => sanitizedInput.includes(num.toString()));
    if (!numPresenceCheck) {
      setMessage("All numbers must be present in the expression.");
      return;
    }

    // concatenation check
    const invalidConcatRegex = numbers.map(num => `(?<=\\d)${num}(?=\\d)`).join("|");
    if (new RegExp(invalidConcatRegex).test(sanitizedInput)) {
      setMessage("Numbers cannot be concatenated");
      return;
    }

    try {
      const result = eval(sanitizedInput);

      if (result === 24) {
        setMessage("Correct!");
      } else {
        setMessage(`Incorrect expression. Evaluates to ${result}`);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white pr-2 pl-2">
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
            className="bg-blue-500 px-6 py-2 rounded-lg shadow"
          >
            Submit
          </button>

          <button
            onClick={handleNext}
            className="bg-green-500 px-6 py-2 rounded-lg shadow"
          >
            Next
          </button>

          <button
            onClick={handleShowAnswer}
            className="bg-red-500 px-6 py-2 rounded-lg shadow"
          >
            Show Answer
          </button>
        </div>

        <p className="mt-6 text-center text-yellow-400">{message}</p>
      </div>
    </div>
  );
};

export default TwentyFour;
