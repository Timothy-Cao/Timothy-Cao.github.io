"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/** Normalize display symbols to math operators for the parser */
function normalizeExpr(expr: string): string {
  return expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");
}

/** Convert raw math operators to pretty display symbols */
function prettifyExpr(expr: string): string {
  return expr
    .replace(/\*/g, "×")
    .replace(/\//g, "÷");
}

/** Format a solution string with pretty symbols */
function prettifySolution(sol: string): string {
  return prettifyExpr(sol);
}

const OP_BUTTONS = [
  { label: "+", insert: "+" },
  { label: "−", insert: "-" },
  { label: "×", insert: "×" },
  { label: "÷", insert: "÷" },
  { label: "(", insert: "(" },
  { label: ")", insert: ")" },
];

export default function TwentyFourPage() {
  const [currentEntry, setCurrentEntry] = useState<PuzzleEntry>(getRandomEntry);
  const [userExpression, setUserExpression] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [showInfo, setShowInfo] = useState(false);
  const [usedNumbers, setUsedNumbers] = useState<boolean[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const insertAtCursor = (text: string) => {
    const input = inputRef.current;
    if (!input) {
      setUserExpression((prev) => prev + text);
      return;
    }
    const start = input.selectionStart ?? userExpression.length;
    const end = input.selectionEnd ?? userExpression.length;
    const newExpr = userExpression.slice(0, start) + text + userExpression.slice(end);
    setUserExpression(newExpr);
    // Restore cursor position after React re-render
    requestAnimationFrame(() => {
      input.selectionStart = input.selectionEnd = start + text.length;
      input.focus();
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Auto-convert * and / to pretty symbols as user types
    let val = e.target.value;
    val = val.replace(/\*/g, "×").replace(/\//g, "÷");
    setUserExpression(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateExpression();
    }
  };

  // Track which numbers from the cards appear in the expression
  const updateUsedNumbers = (expr: string) => {
    const normalized = normalizeExpr(expr).replace(/\s+/g, "");
    const inputNums = normalized.match(/[0-9]+/g) || [];
    const remaining = [...currentEntry.numbers.map(String)];
    const used = currentEntry.numbers.map(() => false);

    for (const n of inputNums) {
      const idx = remaining.indexOf(n);
      if (idx !== -1) {
        // Find the original index in currentEntry.numbers
        let origIdx = -1;
        for (let i = 0; i < currentEntry.numbers.length; i++) {
          if (!used[i] && String(currentEntry.numbers[i]) === n) {
            origIdx = i;
            break;
          }
        }
        if (origIdx !== -1) used[origIdx] = true;
        remaining.splice(idx, 1);
      }
    }
    setUsedNumbers(used);
  };

  const validateExpression = () => {
    const normalized = normalizeExpr(userExpression).replace(/\s+/g, "");
    if (!/^[0-9+\-*/()]+$/.test(normalized)) {
      setMessage("Invalid characters in expression.");
      setMessageType("error");
      return;
    }
    const inputNums = normalized.match(/[0-9]+/g) || [];
    const inputCounts = countNumbers(inputNums);
    const providedCounts = countNumbers(currentEntry.numbers.map(String));
    const isValid =
      Object.keys(providedCounts).length === Object.keys(inputCounts).length &&
      Object.keys(providedCounts).every((n) => providedCounts[n] === inputCounts[n]);
    if (!isValid) {
      setMessage("You must use each number exactly once");
      setMessageType("error");
      return;
    }
    try {
      const result = safeEvaluate(normalized);
      if (result === 24) {
        setMessage("Correct!");
        setMessageType("success");
      } else {
        setMessage(`Evaluates to ${result}, not 24`);
        setMessageType("error");
      }
    } catch {
      setMessage("Invalid mathematical expression.");
      setMessageType("error");
    }
  };

  const handleNext = () => {
    setCurrentEntry(getRandomEntry());
    setUserExpression("");
    setMessage("");
    setUsedNumbers([]);
    inputRef.current?.focus();
  };

  const showAnswer = () => {
    setMessage(`Answer: ${prettifySolution(currentEntry.solution)}`);
    setMessageType("info");
  };

  // Update used-number highlighting when expression changes
  const onExpressionChange = (val: string) => {
    setUserExpression(val);
    updateUsedNumbers(val);
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Math Game 24</h1>
          <p className="text-muted text-center mb-8 flex items-center justify-center gap-2">
            Make 24 using all four numbers.
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
          {/* Number cards — tap to insert */}
          <div className="flex justify-center gap-4">
            {currentEntry.numbers.map((num, i) => (
              <motion.button
                key={`${num}-${i}`}
                whileTap={{ scale: 0.9 }}
                onClick={() => insertAtCursor(String(num))}
                className={`w-16 h-20 rounded-xl border flex items-center justify-center text-2xl font-bold transition-all cursor-pointer select-none ${
                  usedNumbers[i]
                    ? "bg-accent/10 border-accent/40 text-accent/50 scale-95"
                    : "bg-surface border-accent/20 text-accent shadow-[0_0_10px_var(--color-accent-glow)] hover:border-accent/50 hover:shadow-[0_0_15px_var(--color-accent-glow)]"
                }`}
              >
                {num}
              </motion.button>
            ))}
          </div>

          {/* Operator buttons */}
          <div className="flex justify-center gap-2">
            {OP_BUTTONS.map((op) => (
              <button
                key={op.label}
                onClick={() => insertAtCursor(op.insert)}
                className="w-10 h-10 rounded-lg bg-surface border border-border hover:border-accent/40 text-lg font-bold transition-colors flex items-center justify-center select-none hover:text-accent"
              >
                {op.label}
              </button>
            ))}
            <button
              onClick={() => {
                setUserExpression("");
                setUsedNumbers([]);
                inputRef.current?.focus();
              }}
              className="px-3 h-10 rounded-lg bg-surface border border-border hover:border-red-400/40 text-xs font-semibold transition-colors flex items-center justify-center select-none hover:text-red-400 text-muted"
            >
              Clear
            </button>
          </div>

          {/* Expression input — shows pretty symbols */}
          <div className="relative max-w-md mx-auto">
            <input
              ref={inputRef}
              type="text"
              placeholder="Tap numbers and operators, or type here"
              value={userExpression}
              onChange={(e) => {
                handleInputChange(e);
                updateUsedNumbers(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-surface border border-border text-center text-xl p-4 rounded-lg focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-3">
            <button onClick={validateExpression} className="bg-accent/20 hover:bg-accent/30 text-accent px-6 py-2 rounded-lg border border-accent/30 transition-colors font-semibold">
              Submit
            </button>
            <button onClick={showAnswer} className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-6 py-2 rounded-lg border border-yellow-500/30 transition-colors">
              Reveal
            </button>
            <button onClick={handleNext} className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-6 py-2 rounded-lg border border-green-500/30 transition-colors">
              Next
            </button>
          </div>

          {/* Result message */}
          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                key={message}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-lg font-semibold ${
                  messageType === "success" ? "text-green-400" : messageType === "error" ? "text-red-400" : "text-yellow-400"
                }`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Info modal */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20"
              onClick={() => setShowInfo(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="p-8 bg-surface border border-border rounded-xl max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">How to play</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted">
                  <li>Make an expression that equals <strong className="text-foreground">24</strong> exactly.</li>
                  <li>Use each of the four numbers <strong className="text-foreground">exactly once</strong>.</li>
                  <li>Use + − × ÷ and parentheses.</li>
                  <li>Tap number cards and operator buttons, or type directly.</li>
                </ol>
                <p className="mt-3 text-muted">Example: (10 − 2) × (9 ÷ 3) = 24</p>
                <button
                  className="mt-6 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-accent hover:bg-accent/20 transition-colors"
                  onClick={() => setShowInfo(false)}
                >
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
