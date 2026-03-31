"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";

const QUESTION_BANK_URL =
  "https://raw.githubusercontent.com/EricAndrechek/FermiQuestions/main/question-bank.json";

interface Question {
  question: string;
  answer: number;
}

interface HistoryEntry {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  points: number;
  skipped: boolean;
}

interface ScaleBarData {
  userAnswer: number;
  correctAnswer: number;
  points: number;
}

function renderQuestion(text: string) {
  return text.replace(/<sup>(.*?)<\/sup>/g, "^$1").replace(/<sub>(.*?)<\/sub>/g, "_$1");
}

function formatDecimal(exp: number) {
  if (exp >= 0 && exp <= 15) return Number(10 ** exp).toLocaleString("en-US");
  if (exp < 0 && exp >= -6) return (10 ** exp).toFixed(Math.abs(exp));
  return `10^${exp}`;
}

function pointsColor(pts: number) {
  if (pts === 5) return "text-green-400";
  if (pts === 3) return "text-yellow-400";
  if (pts === 1) return "text-orange-400";
  return "text-red-400";
}

function pointsBg(pts: number) {
  if (pts === 5) return "bg-green-400";
  if (pts === 3) return "bg-yellow-400";
  if (pts === 1) return "bg-orange-400";
  return "bg-red-400";
}

/** Visual comparison bar showing your answer vs correct answer */
function ScaleBar({ data }: { data: ScaleBarData }) {
  // Show a window around the two values
  const lo = Math.min(data.userAnswer, data.correctAnswer);
  const hi = Math.max(data.userAnswer, data.correctAnswer);
  const pad = Math.max(5, Math.ceil((hi - lo) * 0.4));
  const rangeMin = Math.max(-50, lo - pad);
  const rangeMax = Math.min(50, hi + pad);
  const range = rangeMax - rangeMin || 1;

  const userPos = ((data.userAnswer - rangeMin) / range) * 100;
  const correctPos = ((data.correctAnswer - rangeMin) / range) * 100;
  const diff = Math.abs(data.correctAnswer - data.userAnswer);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full max-w-md mt-4 mb-2"
    >
      <div className="relative h-12">
        {/* Track */}
        <div className="absolute top-5 left-0 right-0 h-1 rounded-full bg-border" />

        {/* Difference band */}
        {diff > 0 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={`absolute top-4 h-3 rounded-full ${
              diff <= 1 ? "bg-green-400/20" : diff <= 2 ? "bg-yellow-400/20" : "bg-red-400/20"
            }`}
            style={{
              left: `${Math.min(userPos, correctPos)}%`,
              width: `${Math.abs(correctPos - userPos)}%`,
              transformOrigin: userPos < correctPos ? "left" : "right",
            }}
          />
        )}

        {/* Correct answer marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute top-2.5"
          style={{ left: `${correctPos}%` }}
        >
          <div className="relative -translate-x-1/2">
            <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-green-300" />
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-green-400 font-semibold whitespace-nowrap">
              10^{data.correctAnswer}
            </div>
          </div>
        </motion.div>

        {/* User answer marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring" }}
          className="absolute top-2.5"
          style={{ left: `${userPos}%` }}
        >
          <div className="relative -translate-x-1/2">
            <div className={`w-3 h-3 rounded-full ${pointsBg(data.points)} border-2 border-white/30`} />
            <div className={`absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap ${pointsColor(data.points)}`}>
              10^{data.userAnswer}
            </div>
          </div>
        </motion.div>

        {/* Range labels */}
        <div className="absolute top-5 mt-3 left-0 text-[9px] text-muted/40">10^{rangeMin}</div>
        <div className="absolute top-5 mt-3 right-0 text-[9px] text-muted/40">10^{rangeMax}</div>
      </div>

      {/* Diff annotation */}
      <div className="text-center mt-2">
        <span className={`text-xs ${diff === 0 ? "text-green-400" : diff <= 2 ? "text-yellow-400" : "text-red-400"}`}>
          {diff === 0 ? "Exact match!" : `Off by ${diff} order${diff > 1 ? "s" : ""} of magnitude`}
        </span>
      </div>
    </motion.div>
  );
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
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("0");
  const [scaleBar, setScaleBar] = useState<ScaleBarData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Slider drag state
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Refs for keyboard handler to access latest state
  const currentRef = useRef(current);
  const editingRef = useRef(editing);
  currentRef.current = current;
  editingRef.current = editing;

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

  const advanceQuestion = () => {
    if (qIndex < questions.length) {
      setCurrent(questions[qIndex]);
      setQIndex((i) => i + 1);
      setQNum((n) => n + 1);
      setValue(0);
    } else {
      setCurrent(null);
    }
  };

  const submit = useCallback(() => {
    if (!currentRef.current) return;
    const q = currentRef.current;
    const diff = Math.abs(q.answer - value);
    const awarded = diff === 0 ? 5 : diff === 1 ? 3 : diff === 2 ? 1 : 0;
    const isCorrect = diff <= 1;

    setMaxPoints((p) => p + 5);
    setPoints((p) => p + awarded);

    if (isCorrect) {
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }

    setHistory((h) => [
      { question: q.question, userAnswer: value, correctAnswer: q.answer, points: awarded, skipped: false },
      ...h,
    ]);

    setScaleBar({ userAnswer: value, correctAnswer: q.answer, points: awarded });
    const msgs: Record<number, string> = { 0: "Perfect! 5 pts", 1: "Close! 3 pts", 2: "Not bad! 1 pt" };
    setResult(msgs[diff] || "0 pts — keep going!");
    advanceQuestion();
  }, [value, qIndex, questions]);

  const skip = useCallback(() => {
    if (!currentRef.current) return;
    const q = currentRef.current;
    setStreak(0);
    setHistory((h) => [
      { question: q.question, userAnswer: 0, correctAnswer: q.answer, points: 0, skipped: true },
      ...h,
    ]);
    setScaleBar(null);
    setResult("");
    advanceQuestion();
  }, [qIndex, questions]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't intercept when editing the text input
      if (editingRef.current) return;
      // Don't intercept when typing in other inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setValue((v) => clamp(v - (e.shiftKey ? 5 : 1)));
          break;
        case "ArrowRight":
          e.preventDefault();
          setValue((v) => clamp(v + (e.shiftKey ? 5 : 1)));
          break;
        case "ArrowDown":
          e.preventDefault();
          setValue((v) => clamp(v - (e.shiftKey ? 10 : 5)));
          break;
        case "ArrowUp":
          e.preventDefault();
          setValue((v) => clamp(v + (e.shiftKey ? 10 : 5)));
          break;
        case "Enter":
          e.preventDefault();
          submit();
          break;
        case "s":
        case "S":
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            skip();
          }
          break;
        case "0":
          if (!e.ctrlKey && !e.metaKey) {
            setValue(0);
          }
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [submit, skip]);

  // Scroll history to top when new entry added
  useEffect(() => {
    historyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [history.length]);

  const thumbColor = Math.abs(value) > 30
    ? "bg-red-500"
    : Math.abs(value) > 15
    ? "bg-orange-400"
    : Math.abs(value) > 5
    ? "bg-yellow-400"
    : "bg-accent";

  const answered = history.filter((h) => !h.skipped).length;

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Fermi Estimations</h1>
          <p className="text-muted mb-1">
            Guess to the nearest order of magnitude!
          </p>
          <p className="text-muted/50 text-xs mb-8">
            <span className="hidden md:inline">Keyboard: ←→ adjust ±1 · Shift+←→ ±5 · ↑↓ ±5/±10 · Enter submit · S skip · 0 reset</span>
            <span className="md:hidden">Tap the number to type directly</span>
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Side panel — score + history */}
          <div className="lg:w-72 flex flex-col gap-4 flex-shrink-0">
            {/* Score card */}
            <div className="rounded-xl bg-surface border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold">Score</h2>
                <div className="text-sm text-muted">Q{qNum + 1}</div>
              </div>
              <div className="text-2xl font-bold text-accent mb-3">{points}/{maxPoints}</div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {answered > 0 && (
                  <div>
                    <div className="text-muted text-xs">Accuracy</div>
                    <div className="font-semibold">{Math.round((points / maxPoints) * 100)}%</div>
                  </div>
                )}
                <div>
                  <div className="text-muted text-xs">Streak</div>
                  <div className="font-semibold flex items-center gap-1">
                    {streak > 0 && <span className="text-orange-400">🔥</span>}
                    <span className={streak >= 3 ? "text-orange-400" : ""}>{streak}</span>
                    {bestStreak > 0 && (
                      <span className="text-muted text-xs ml-1">(best: {bestStreak})</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Streak banner */}
            <AnimatePresence>
              {streak >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="rounded-xl bg-orange-500/10 border border-orange-500/30 p-3 text-center"
                >
                  <div className="text-lg font-bold text-orange-400">
                    🔥 {streak} streak!
                  </div>
                  <div className="text-xs text-orange-400/70">
                    {streak >= 10 ? "Legendary!" : streak >= 7 ? "On fire!" : streak >= 5 ? "Unstoppable!" : "Keep it going!"}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Answer history */}
            <div className="rounded-xl bg-surface border border-border p-4 flex-1 min-h-0">
              <h3 className="font-bold mb-3 text-sm">History</h3>
              <div ref={historyRef} className="space-y-2 max-h-64 lg:max-h-96 overflow-y-auto pr-1 scrollbar-thin">
                {history.length === 0 ? (
                  <p className="text-muted text-xs">No answers yet</p>
                ) : (
                  history.slice(0, 3).map((h, i) => (
                    <motion.div
                      key={history.length - i}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs border-b border-border/50 pb-2 last:border-0"
                    >
                      <p className="text-muted line-clamp-2 mb-1">{renderQuestion(h.question)}</p>
                      {h.skipped ? (
                        <div className="flex items-center gap-2">
                          <span className="text-muted/60 italic">Skipped</span>
                          <span className="text-green-400">Answer: 10^{h.correctAnswer}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-accent">You: 10^{h.userAnswer}</span>
                          <span className="text-green-400">Ans: 10^{h.correctAnswer}</span>
                          <span className={`font-semibold ml-auto ${pointsColor(h.points)}`}>
                            {h.points}/5
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Game area */}
          <div className="flex-1 rounded-xl bg-surface border border-border p-6 flex flex-col items-center">
            {current ? (
              <>
                {/* Question */}
                <div className="text-center text-muted leading-relaxed max-w-lg mb-8 min-h-[3rem]">
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
                <div
                  className="w-full max-w-md mb-6 px-2"
                  onWheel={(e) => {
                    e.preventDefault();
                    const delta = e.deltaY < 0 ? 1 : -1;
                    setValue((v) => clamp(v + delta * (e.shiftKey ? 5 : 1)));
                  }}
                >
                  <div
                    ref={sliderRef}
                    className="relative h-10 cursor-pointer select-none touch-none"
                    onMouseDown={handleSliderDown}
                    onTouchStart={handleSliderDown}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-border" />

                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-accent/40"
                      style={{
                        left: `${Math.min(posFromValue(0), posFromValue(value))}%`,
                        width: `${Math.abs(posFromValue(value) - posFromValue(0))}%`,
                      }}
                    />

                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-muted/40"
                      style={{ left: `${posFromValue(0)}%` }}
                    />

                    {[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((tick) => (
                      <div
                        key={tick}
                        className="absolute top-full mt-1 -translate-x-1/2 text-[10px] text-muted/50"
                        style={{ left: `${posFromValue(tick)}%` }}
                      >
                        {tick}
                      </div>
                    ))}

                    <div
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full ${thumbColor} shadow-lg shadow-accent/20 transition-colors border-2 border-white/20`}
                      style={{ left: `${posFromValue(value)}%` }}
                    />
                  </div>
                </div>

                {/* Visual scale bar — shows after submit */}
                <AnimatePresence>
                  {scaleBar && <ScaleBar data={scaleBar} />}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={skip}
                    className="px-5 py-2.5 rounded-lg text-sm text-muted hover:text-foreground border border-border hover:border-accent/30 transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={submit}
                    className="bg-accent/20 hover:bg-accent/30 text-accent px-8 py-2.5 rounded-lg font-semibold transition-colors border border-accent/30"
                  >
                    Submit
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {result && (
                    <motion.div
                      key={result + qNum}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-semibold mt-3 text-sm"
                    >
                      {result}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl mb-4">Game Complete!</h3>
                <div className="text-lg mb-2">Final Score: {points}/{maxPoints}</div>
                {answered > 0 && (
                  <div className="text-muted">
                    {Math.round((points / maxPoints) * 100)}% accuracy · Best streak: {bestStreak}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
