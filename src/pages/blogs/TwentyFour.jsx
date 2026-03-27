import React, { useState } from "react";
import data from "../../utils/24table.json";

// Safe math expression evaluator — recursive descent parser for +, -, *, /, ()
const safeEvaluate = (expr) => {
  const tokens = [];
  let i = 0;

  while (i < expr.length) {
    if (expr[i] >= "0" && expr[i] <= "9") {
      let num = "";
      while (i < expr.length && expr[i] >= "0" && expr[i] <= "9") num += expr[i++];
      tokens.push({ type: "num", value: Number(num) });
    } else if ("+-*/()".includes(expr[i])) {
      tokens.push({ type: "op", value: expr[i++] });
    } else {
      throw new Error("Invalid character");
    }
  }

  let pos = 0;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  const parseExpr = () => {
    let left = parseTerm();
    while (peek() && (peek().value === "+" || peek().value === "-")) {
      const op = consume().value;
      const right = parseTerm();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  };

  const parseTerm = () => {
    let left = parseFactor();
    while (peek() && (peek().value === "*" || peek().value === "/")) {
      const op = consume().value;
      const right = parseFactor();
      left = op === "*" ? left * right : left / right;
    }
    return left;
  };

  const parseFactor = () => {
    if (peek() && peek().value === "(") {
      consume();
      const result = parseExpr();
      if (!peek() || peek().value !== ")") throw new Error("Mismatched parentheses");
      consume();
      if (peek() && peek().value === "(") return result * parseFactor();
      return result;
    }
    if (peek() && peek().type === "num") {
      const val = consume().value;
      if (peek() && peek().value === "(") return val * parseFactor();
      return val;
    }
    throw new Error("Unexpected token");
  };

  const result = parseExpr();
  if (pos < tokens.length) throw new Error("Unexpected characters after expression");
  return result;
};

const getRandomEntry = () => data[Math.floor(Math.random() * data.length)];

const countNumbers = (nums) =>
  nums.reduce((acc, n) => {
    const key = String(n);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

const TwentyFour = () => {
  const [currentEntry, setCurrentEntry] = useState(getRandomEntry);
  const [userExpression, setUserExpression] = useState("");
  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const validateExpression = () => {
    const sanitized = userExpression.replace(/\s+/g, "");

    if (!/^[0-9+\-*/()]+$/.test(sanitized)) {
      setMessage("Invalid characters in expression.");
      return;
    }

    const inputNums = sanitized.match(/[0-9]+/g) || [];
    const inputCounts = countNumbers(inputNums);
    const providedCounts = countNumbers(currentEntry.numbers.map(String));

    const isValid =
      Object.keys(providedCounts).length === Object.keys(inputCounts).length &&
      Object.keys(providedCounts).every((n) => providedCounts[n] === inputCounts[n]);

    if (!isValid) {
      setMessage("You must use each number exactly once");
      return;
    }

    try {
      const result = safeEvaluate(sanitized);
      setMessage(result === 24 ? "Correct! Good job!" : `Incorrect expression. Yours evaluates to ${result}.`);
    } catch {
      setMessage("Invalid mathematical expression.");
    }
  };

  const handleNext = () => {
    setCurrentEntry(getRandomEntry());
    setUserExpression("");
    setMessage("");
  };

  return (
    <div className="bg-gray-900 text-white px-4">
      <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-4 text-center">Math Game</h1>

        <p className="text-lg mb-4 text-center flex items-center justify-center">
          Make 24 with the numbers with basic operations.
          <button
            className="ml-2 bg-gray-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold hover:bg-gray-600"
            onClick={() => setShowInfo((prev) => !prev)}
            aria-label="How to play"
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
          onChange={(e) => setUserExpression(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && validateExpression()}
          className="w-full mt-6 bg-gray-700 text-center text-2xl p-4 rounded-lg shadow"
        />

        <div className="flex justify-center gap-4 mt-4">
          <button onClick={validateExpression} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg shadow transition-colors">
            Submit
          </button>
          <button onClick={() => setMessage(`Correct Answer: ${currentEntry.solution}`)} className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg shadow transition-colors">
            Check Answer
          </button>
          <button onClick={handleNext} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow transition-colors">
            Next
          </button>
        </div>

        {message && <p className="mt-6 text-center text-yellow-400">{message}</p>}

        {showInfo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20">
            <div className="p-8 bg-gray-800 rounded-lg max-w-md">
              <h2 className="text-2xl font-bold mb-4">How to play</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Make an expression that evaluates to 24 exactly.</li>
                <li>You can only use each number once.</li>
                <li>You can only use the basic 4 operations (+ - / *)</li>
                <li>You can use any number of brackets.</li>
              </ol>
              <p className="mt-3 text-gray-400">E.g. (10-2)(9/3)</p>
              <button
                className="mt-6 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
                onClick={() => setShowInfo(false)}
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
