"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";

const QUESTION_BANK_URL =
  "https://raw.githubusercontent.com/EricAndrechek/FermiQuestions/main/question-bank.json";

interface Question {
  question: string;
  answer: number;
}

interface PreviousResult {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  pointsAwarded: number;
}


function renderQuestion(text: string) {
  return text.replace(/<sup>(.*?)<\/sup>/g, "^$1").replace(/<sub>(.*?)<\/sub>/g, "_$1");
}

function formatDecimal(exp: number) {
  if (exp >= 0 && exp <= 15) return Number(10 ** exp).toLocaleString("en-US");
  if (exp < 0 && exp >= -6) return (10 ** exp).toFixed(Math.abs(exp));
  return `10^${exp}`;
}

export default function FermiPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<Question | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [qNum, setQNum] = useState(0);
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState("");
  const [prev, setPrev] = useState<PreviousResult | null>(null);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("0");
  const inputRef = useRef<HTMLInputElement>(null);

  // Slider drag state
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(QUESTION_BANK_URL);
        const data = await res.json();
        const raw = data.questions;
        const arr: Question[] = [];
        for (const source in raw) {
          for (const q in raw[source]) {
            const a = raw[source][q];
            if (a >= -40 && a <= 40 && q.length < 200) arr.push({ question: q, answer: a });
          }
        }
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setQuestions(arr);
        if (arr.length > 0) { setCurrent(arr[0]); setQIndex(1); }
      } catch { /* noop */ }
    })();
  }, []);

  const clamp = (v: number) => Math.max(-50, Math.min(50, v));

  const posFromValue = (v: number) => ((v + 50) / 100) * 100;

  const valueFromPos = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return clamp(Math.round(pct * 100 - 50));
  }, []);

  const handleSliderDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setValue(valueFromPos(clientX));
  }, [valueFromPos]);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setValue(valueFromPos(clientX));
    };
    const onUp = () => { dragging.current = false; };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    };
  }, [valueFromPos]);

  const startEditing = () => {
    setEditing(true);
    setEditText(String(value));
    setTimeout(() => inputRef.current?.select(), 10);
  };

  const commitEdit = () => {
    const parsed = parseInt(editText, 10);
    if (!isNaN(parsed)) setValue(clamp(parsed));
    setEditing(false);
  };

  const submit = () => {
    if (!current) return;
    const diff = Math.abs(current.answer - value);
    const awarded = diff === 0 ? 5 : diff === 1 ? 3 : diff === 2 ? 1 : 0;
    setMaxPoints((p) => p + 5);
    setPoints((p) => p + awarded);
    setPrev({ question: current.question, userAnswer: value, correctAnswer: current.answer, pointsAwarded: awarded });
    const msgs: Record<number, string> = { 0: "Perfect! 5 points!", 1: "Close! 3 points!", 2: "Not bad! 1 point!" };
    setResult(msgs[diff] || "Keep trying!");
    if (qIndex < questions.length) {
      setCurrent(questions[qIndex]);
      setQIndex((i) => i + 1);
      setQNum((n) => n + 1);
      setValue(0);
    } else {
      setCurrent(null);
    }
  };

  // Color based on distance from 0 for visual feedback
  const thumbColor = Math.abs(value) > 30
    ? "bg-red-500"
    : Math.abs(value) > 15
    ? "bg-orange-400"
    : Math.abs(value) > 5
    ? "bg-yellow-400"
    : "bg-accent";

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Fermi Estimations</h1>
          <p className="text-muted mb-8">
            Guess to the nearest order of magnitude! Use the slider, buttons, or tap the number to type directly.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Score panel */}
          <div className="lg:w-72 rounded-xl bg-surface border border-border p-4 flex-shrink-0">
            <h2 className="font-bold mb-2">Score</h2>
            <div className="text-2xl font-bold text-accent mb-1">{points}/{maxPoints}</div>
            <div className="text-sm text-muted mb-2">Question {qNum + 1}</div>
            {maxPoints > 0 && (
              <div className="mb-3">
                <div className="text-sm text-muted mb-1">Accuracy</div>
                <div className="text-lg font-semibold">{Math.round((points / maxPoints) * 100)}%</div>
              </div>
            )}
            <hr className="border-border mb-3" />
            <h3 className="font-bold mb-2">Previous Question</h3>
            {prev ? (
              <div className="space-y-2 text-sm">
                <p className="text-muted text-xs line-clamp-3">{renderQuestion(prev.question)}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div><div className="text-muted text-xs">Your Answer</div><div className="text-accent font-semibold">10^{prev.userAnswer}</div></div>
                  <div><div className="text-muted text-xs">Correct</div><div className="text-green-400 font-semibold">10^{prev.correctAnswer}</div></div>
                  <div><div className="text-muted text-xs">Points</div><div className="text-yellow-400 font-semibold">{prev.pointsAwarded}/5</div></div>
                  <div><div className="text-muted text-xs">Diff</div><div className="font-semibold">{Math.abs(prev.correctAnswer - prev.userAnswer)}</div></div>
                </div>
              </div>
            ) : (
              <p className="text-muted text-sm">Complete a question to see results</p>
            )}
          </div>

          {/* Game area */}
          <div className="flex-1 rounded-xl bg-surface border border-border p-6 flex flex-col items-center">
            {current ? (
              <>
                {/* Question at the top */}
                <div className="text-center text-muted text-sm leading-relaxed max-w-lg mb-8">
                  {renderQuestion(current.question)}
                </div>

                {/* Value display — tap to edit */}
                <div className="flex items-center gap-4 mb-2">
                  <button
                    onClick={() => setValue((v) => clamp(v - 1))}
                    className="w-10 h-10 rounded-lg bg-surface border border-border hover:border-accent/50 text-lg font-bold transition-colors flex items-center justify-center select-none"
                    aria-label="Decrease"
                  >
                    −
                  </button>

                  {editing ? (
                    <input
                      ref={inputRef}
                      type="number"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={commitEdit}
                      onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                      className="w-24 text-center text-3xl font-bold bg-transparent border-b-2 border-accent outline-none"
                      min={-50}
                      max={50}
                      autoFocus
                    />
                  ) : (
                    <button
                      onClick={startEditing}
                      className="group cursor-text"
                      title="Click to type a value"
                    >
                      <div className="text-3xl font-bold group-hover:text-accent transition-colors">
                        10<sup className="text-xl">{value}</sup>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => setValue((v) => clamp(v + 1))}
                    className="w-10 h-10 rounded-lg bg-surface border border-border hover:border-accent/50 text-lg font-bold transition-colors flex items-center justify-center select-none"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                {/* Decimal representation */}
                <div className="text-sm text-muted mb-6 h-6">
                  {formatDecimal(value)}
                </div>

                {/* Slider */}
                <div className="w-full max-w-md mb-2 px-2">
                  <div
                    ref={sliderRef}
                    className="relative h-10 cursor-pointer select-none touch-none"
                    onMouseDown={handleSliderDown}
                    onTouchStart={handleSliderDown}
                  >
                    {/* Track */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-border" />

                    {/* Active fill */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-accent/40"
                      style={{
                        left: `${Math.min(posFromValue(0), posFromValue(value))}%`,
                        width: `${Math.abs(posFromValue(value) - posFromValue(0))}%`,
                      }}
                    />

                    {/* Zero mark */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-muted/40"
                      style={{ left: `${posFromValue(0)}%` }}
                    />

                    {/* Tick marks every 10 */}
                    {[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((tick) => (
                      <div
                        key={tick}
                        className="absolute top-full mt-1 -translate-x-1/2 text-[10px] text-muted/50"
                        style={{ left: `${posFromValue(tick)}%` }}
                      >
                        {tick}
                      </div>
                    ))}

                    {/* Thumb */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full ${thumbColor} shadow-lg shadow-accent/20 transition-colors border-2 border-white/20`}
                      style={{ left: `${posFromValue(value)}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={submit}
                  className="bg-accent/20 hover:bg-accent/30 text-accent px-8 py-2.5 rounded-lg font-semibold transition-colors border border-accent/30"
                >
                  Submit Answer
                </button>

                {result && <div className="font-semibold mt-4">{result}</div>}
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl mb-4">Game Complete!</h3>
                <div className="text-lg">Final Score: {points}/{maxPoints}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
