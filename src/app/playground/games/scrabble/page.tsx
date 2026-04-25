"use client";

import { useState } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { wordSets } from "@/data/scrabble";

const allKeys = Object.keys(wordSets);

export default function ScrabblePage() {
  const [keys] = useState<string[]>(() => [...allKeys].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userInput, setUserInput] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const currentKey = keys[currentIndex];
  const validWords = wordSets[currentKey] || [];

  const handleGuess = () => {
    if (validWords.includes(userInput.toLowerCase())) {
      setFeedback("Correct!");
      setShowAnswers(true);
    } else {
      setFeedback("Incorrect.");
    }
    setUserInput("");
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % keys.length);
    setFeedback("");
    setUserInput("");
    setShowAnswers(false);
  };

  if (!currentKey) return null;

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Scrabble Trainer</h1>
          <p className="text-muted text-center mb-8 flex items-center justify-center gap-2">
            Unscramble letters to find valid words!
            <button
              className="bg-surface border border-border rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold hover:border-accent/30 transition-colors"
              onClick={() => setShowInfo(true)}
              aria-label="About this game"
            >
              ?
            </button>
          </p>
        </ScrollReveal>

        <div className="text-center space-y-6">
          <p className="text-sm text-muted">Question {currentIndex + 1} of {keys.length}</p>
          <h2 className="text-4xl font-mono tracking-[0.3em] text-accent">{currentKey}</h2>

          <div className="flex justify-center gap-3 flex-wrap">
            <input
              type="text"
              value={userInput}
              placeholder="Enter your guess"
              className="px-4 py-2 rounded-lg bg-surface border border-border text-foreground focus:border-accent focus:outline-none"
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            />
            <button onClick={handleGuess} className="bg-accent/20 hover:bg-accent/30 text-accent px-6 py-2 rounded-lg border border-accent/30 transition-colors">
              Submit
            </button>
            <button onClick={() => setShowAnswers(true)} className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-6 py-2 rounded-lg border border-yellow-500/30 transition-colors">
              Check Answers
            </button>
            <button onClick={handleNext} className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-2 rounded-lg border border-green-500/30 transition-colors">
              Next
            </button>
          </div>

          {feedback && (
            <div className={`text-2xl font-bold ${feedback === "Correct!" ? "text-green-400" : "text-red-400"}`}>
              {feedback}
            </div>
          )}

          {showAnswers && (
            <div className="text-left max-w-sm mx-auto">
              <h3 className="font-bold mb-2">Valid Answers:</h3>
              <ul className="list-disc list-inside space-y-1">
                {validWords.map((word) => (
                  <li key={word}>
                    <a
                      href={`https://www.thefreedictionary.com/${word}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {word}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {showInfo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20" onClick={() => setShowInfo(false)}>
            <div className="p-8 bg-surface border border-border rounded-xl max-w-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold mb-4">About Scrabble Trainer</h2>
              <p className="text-muted leading-relaxed">
                These are the top 50 most likely arrangements of letters that form valid
                Scrabble words. The letters are sorted alphabetically, so when you sort your
                tiles in the game, you can recognize these words more easily.
              </p>
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
