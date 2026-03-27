"use client";

import { useState } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { safeEvaluate, countNumbers } from "@/lib/math-parser";
import data from "@/data/24table.json";

interface PuzzleEntry {
  numbers: number[];
  solution: string;
}

const puzzles = data as PuzzleEntry[];
const getRandomEntry = () => puzzles[Math.floor(Math.random() * puzzles.length)];

export default function TwentyFourPage() {
  const [currentEntry, setCurrentEntry] = useState<PuzzleEntry>(getRandomEntry);
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
      setMessage(result === 24 ? "Correct! Good job!" : `Incorrect. Yours evaluates to ${result}.`);
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
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Math Game 24</h1>
          <p className="text-muted text-center mb-8 flex items-center justify-center gap-2">
            Make 24 with the numbers using basic operations.
            <button
              className="bg-surface border border-border rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold hover:border-accent/30 transition-colors"
              onClick={() => setShowInfo(true)}
              aria-label="How to play"
            >
              ?
            </button>
          </p>
        </ScrollReveal>

        <div className="text-center space-y-6">
          {/* Number cards */}
          <div className="flex justify-center gap-4">
            {currentEntry.numbers.map((num, i) => (
              <div
                key={i}
                className="w-16 h-20 rounded-xl bg-surface border border-accent/20 flex items-center justify-center text-2xl font-bold text-accent shadow-[0_0_10px_var(--color-accent-glow)]"
              >
                {num}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Enter your expression"
            value={userExpression}
            onChange={(e) => setUserExpression(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && validateExpression()}
            className="w-full max-w-md mx-auto bg-surface border border-border text-center text-xl p-4 rounded-lg focus:border-accent focus:outline-none"
          />

          <div className="flex justify-center gap-3">
            <button onClick={validateExpression} className="bg-accent/20 hover:bg-accent/30 text-accent px-6 py-2 rounded-lg border border-accent/30 transition-colors">
              Submit
            </button>
            <button onClick={() => setMessage(`Answer: ${currentEntry.solution}`)} className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-6 py-2 rounded-lg border border-yellow-500/30 transition-colors">
              Check Answer
            </button>
            <button onClick={handleNext} className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-2 rounded-lg border border-green-500/30 transition-colors">
              Next
            </button>
          </div>

          {message && (
            <p className={`text-lg font-semibold ${message.startsWith("Correct") ? "text-green-400" : "text-yellow-400"}`}>
              {message}
            </p>
          )}
        </div>

        {showInfo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20" onClick={() => setShowInfo(false)}>
            <div className="p-8 bg-surface border border-border rounded-xl max-w-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold mb-4">How to play</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted">
                <li>Make an expression that evaluates to 24 exactly.</li>
                <li>You can only use each number once.</li>
                <li>You can only use the basic 4 operations (+ - / *)</li>
                <li>You can use any number of brackets.</li>
              </ol>
              <p className="mt-3 text-muted">E.g. (10-2)(9/3)</p>
              <button
                className="mt-6 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-accent hover:bg-accent/20 transition-colors"
                onClick={() => setShowInfo(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
