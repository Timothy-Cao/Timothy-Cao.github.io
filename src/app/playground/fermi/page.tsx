"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/ui/scroll-reveal";

const QUESTION_BANK_URL =
  "https://raw.githubusercontent.com/EricAndrechek/FermiQuestions/main/question-bank.json";
const DIAL_SIZE = 160;
const DIAL_CENTER = DIAL_SIZE / 2;
const DIAL_RADIUS = 60;
const DEGREES_PER_UNIT = 14.4;

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
  if (exp >= 0) return Number(10 ** exp).toLocaleString("en-US");
  return (10 ** exp).toFixed(Math.abs(exp));
}

function getAngle(cx: number, cy: number, px: number, py: number) {
  return ((Math.atan2(py - cy, px - cx) * 180) / Math.PI + 360) % 360;
}

export default function FermiPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<Question | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [qNum, setQNum] = useState(0);
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [dialValue, setDialValue] = useState(0);
  const [result, setResult] = useState("");
  const [prev, setPrev] = useState<PreviousResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const dialRef = useRef<SVGSVGElement>(null);
  const lastAngle = useRef(0);

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

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const rect = dialRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const isTouch = "touches" in e;
    const px = isTouch ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const py = isTouch ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    lastAngle.current = getAngle(cx, cy, px, py);
  };

  const onMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragging || !dialRef.current) return;
      e.preventDefault();
      const rect = dialRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const isTouch = "touches" in e;
      const px = isTouch ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const py = isTouch ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const angle = getAngle(cx, cy, px, py);
      let diff = angle - lastAngle.current;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      const change = Math.round(diff / DEGREES_PER_UNIT);
      if (change !== 0) {
        setDialValue((v) => Math.max(-50, Math.min(50, v + change)));
        lastAngle.current = angle;
      }
    },
    [dragging]
  );

  useEffect(() => {
    if (!dragging) return;
    const end = () => setDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", end);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", end);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", end);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", end);
    };
  }, [dragging, onMove]);

  const submit = () => {
    if (!current) return;
    const diff = Math.abs(current.answer - dialValue);
    const awarded = diff === 0 ? 5 : diff === 1 ? 3 : diff === 2 ? 1 : 0;
    setMaxPoints((p) => p + 5);
    setPoints((p) => p + awarded);
    setPrev({ question: current.question, userAnswer: dialValue, correctAnswer: current.answer, pointsAwarded: awarded });
    const msgs: Record<number, string> = { 0: "Perfect! 5 points!", 1: "Close! 3 points!", 2: "Not bad! 1 point!" };
    setResult(msgs[diff] || "Keep trying!");
    if (qIndex < questions.length) {
      setCurrent(questions[qIndex]);
      setQIndex((i) => i + 1);
      setQNum((n) => n + 1);
      setDialValue(0);
    } else {
      setCurrent(null);
    }
  };

  const rotation = (dialValue / 100) * 1440;
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Fermi Estimations</h1>
          <p className="text-muted mb-8">
            Try to guess to the nearest order of magnitude! Turn the dial to adjust your estimation.
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
                <svg
                  ref={dialRef}
                  width={DIAL_SIZE}
                  height={DIAL_SIZE}
                  className="select-none mb-4"
                  onMouseDown={startDrag}
                  onTouchStart={startDrag}
                  style={{ touchAction: "none" }}
                >
                  <circle cx={DIAL_CENTER} cy={DIAL_CENTER} r={DIAL_RADIUS} fill="#1a1a1a" stroke="var(--color-border, #333)" strokeWidth="2" />
                  {Array.from({ length: 20 }, (_, i) => {
                    const a = (i / 20) * 360;
                    const main = i % 5 === 0;
                    const len = main ? 12 : 6;
                    return (
                      <line key={i}
                        x1={DIAL_CENTER + Math.cos(toRad(a)) * (DIAL_RADIUS - len)}
                        y1={DIAL_CENTER + Math.sin(toRad(a)) * (DIAL_RADIUS - len)}
                        x2={DIAL_CENTER + Math.cos(toRad(a)) * DIAL_RADIUS}
                        y2={DIAL_CENTER + Math.sin(toRad(a)) * DIAL_RADIUS}
                        stroke="#666" strokeWidth={main ? "2" : "1"} />
                    );
                  })}
                  <line
                    x1={DIAL_CENTER} y1={DIAL_CENTER}
                    x2={DIAL_CENTER + Math.cos(toRad(rotation)) * 45}
                    y2={DIAL_CENTER + Math.sin(toRad(rotation)) * 45}
                    stroke="var(--color-accent, #00e5ff)" strokeWidth="4" strokeLinecap="round"
                  />
                  <circle cx={DIAL_CENTER} cy={DIAL_CENTER} r="6" fill="var(--color-accent, #00e5ff)" />
                </svg>

                <div className="text-center mb-4">
                  <div className="text-xl font-bold">10<sup>{dialValue}</sup></div>
                  <div className="text-sm text-muted h-8 flex items-center justify-center break-all px-2">
                    {formatDecimal(dialValue)}
                  </div>
                </div>

                <button
                  onClick={submit}
                  className="bg-accent/20 hover:bg-accent/30 text-accent px-6 py-2 rounded-lg font-semibold transition-colors border border-accent/30 mb-4"
                >
                  Submit Answer
                </button>

                {result && <div className="font-semibold mb-4">{result}</div>}

                <div className="text-center text-muted text-sm leading-relaxed max-w-lg">
                  {renderQuestion(current.question)}
                </div>
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
