import { NextResponse } from "next/server";

export const runtime = "nodejs";

const QUESTION_BANK_URL =
  "https://raw.githubusercontent.com/EricAndrechek/FermiQuestions/main/question-bank.json";
const MAX_BODY_BYTES = 2_000_000;

type RawQuestionBank = {
  questions?: Record<string, Record<string, number>>;
};

type Question = {
  question: string;
  answer: number;
};

function isQuestionBank(data: unknown): data is RawQuestionBank {
  return (
    typeof data === "object" &&
    data !== null &&
    "questions" in data &&
    typeof (data as RawQuestionBank).questions === "object"
  );
}

function normalizeQuestionBank(raw: RawQuestionBank) {
  const arr: Question[] = [];
  const bank = raw.questions ?? {};

  for (const sourceQuestions of Object.values(bank)) {
    if (!sourceQuestions || typeof sourceQuestions !== "object") {
      continue;
    }

    for (const [question, answer] of Object.entries(sourceQuestions)) {
      if (
        typeof question === "string" &&
        typeof answer === "number" &&
        Number.isFinite(answer) &&
        answer >= -40 &&
        answer <= 40 &&
        question.length > 0 &&
        question.length < 200
      ) {
        arr.push({ question, answer });
      }
    }
  }

  return arr;
}

export async function GET() {
  try {
    const res = await fetch(QUESTION_BANK_URL, {
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Unable to load question bank" },
        { status: 502 }
      );
    }

    const text = await res.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Question bank too large" },
        { status: 502 }
      );
    }

    const data: unknown = JSON.parse(text);
    if (!isQuestionBank(data)) {
      return NextResponse.json(
        { error: "Question bank payload invalid" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { questions: normalizeQuestionBank(data) },
      {
        headers: {
          "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to load question bank" },
      { status: 502 }
    );
  }
}
