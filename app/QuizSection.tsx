"use client";

import { useEffect, useState } from "react";
import type { QuizQuestion } from "./lib/types";
import { markTodayCompleted } from "./StreakBadge";

const ANSWERS_KEY = "mente-afinada-quiz-answers";

type AnswersByDate = Record<string, number[]>;

function todayKeyLisbon(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function readAnswers(): AnswersByDate {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ANSWERS_KEY);
    return raw ? (JSON.parse(raw) as AnswersByDate) : {};
  } catch {
    return {};
  }
}

function writeAnswers(data: AnswersByDate) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ANSWERS_KEY, JSON.stringify(data));
}

export default function QuizSection({ quiz }: { quiz: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    const today = todayKeyLisbon();
    const all = readAnswers();
    setAnswers(all[today] ?? []);
  }, []);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (answers[qIndex] !== undefined) return;
    const next = [...answers];
    next[qIndex] = optionIndex;
    setAnswers(next);
    const today = todayKeyLisbon();
    const all = readAnswers();
    all[today] = next;
    writeAnswers(all);

    if (next.filter((a) => a !== undefined).length === quiz.length) {
      markTodayCompleted();
    }
  };

  const answered = answers.filter((a) => a !== undefined).length;
  const correct = answers.filter(
    (a, i) => a !== undefined && a === quiz[i]?.correctIndex
  ).length;
  const allDone = answered === quiz.length;

  if (!quiz || quiz.length === 0) return null;

  return (
    <section
      style={{
        marginTop: "20px",
        padding: "clamp(20px, 5vw, 32px)",
        borderRadius: "24px",
        background:
          "linear-gradient(160deg, rgba(34, 197, 94, 0.06), rgba(15, 23, 42, 0.6))",
        border: "1px solid rgba(34, 197, 94, 0.18)",
      }}
    >
      <header
        className="ma-sans"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        <div>
          <div
            style={{
              padding: "5px 12px",
              borderRadius: "999px",
              background: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              color: "#86efac",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            🧪 Quiz · {quiz.length} perguntas
          </div>
          <h2
            style={{
              fontSize: "clamp(20px, 5vw, 26px)",
              margin: 0,
              fontWeight: 800,
              color: "#f5f5f4",
            }}
          >
            Testa o que fixaste
          </h2>
        </div>
        <div
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            background: allDone
              ? "linear-gradient(90deg, rgba(34, 197, 94, 0.2), rgba(168, 85, 247, 0.2))"
              : "rgba(34, 197, 94, 0.1)",
            border: `1px solid ${
              allDone ? "rgba(34, 197, 94, 0.4)" : "rgba(34, 197, 94, 0.3)"
            }`,
            color: allDone ? "#86efac" : "#bbf7d0",
            fontWeight: 800,
            fontSize: "13px",
            whiteSpace: "nowrap",
          }}
        >
          {allDone
            ? `⭐ ${correct}/${quiz.length}`
            : `${answered}/${quiz.length}`}
        </div>
      </header>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {quiz.map((q, qIndex) => {
          const userAnswer = answers[qIndex];
          const answeredThis = userAnswer !== undefined;
          return (
            <li
              key={qIndex}
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(148, 163, 184, 0.15)",
              }}
            >
              <div
                className="ma-sans"
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#a8a29e",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                Pergunta {qIndex + 1} de {quiz.length}
              </div>
              <p
                style={{
                  margin: "0 0 14px 0",
                  fontSize: "clamp(15px, 4vw, 17px)",
                  fontWeight: 700,
                  color: "#f1f5f9",
                  lineHeight: 1.4,
                }}
              >
                {q.question}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {q.options.map((opt, oIndex) => {
                  const isUser = userAnswer === oIndex;
                  const isCorrect = q.correctIndex === oIndex;
                  let bg = "rgba(148, 163, 184, 0.06)";
                  let border = "rgba(148, 163, 184, 0.2)";
                  let color = "#e2e8f0";

                  if (answeredThis) {
                    if (isCorrect) {
                      bg = "rgba(34, 197, 94, 0.15)";
                      border = "rgba(34, 197, 94, 0.5)";
                      color = "#86efac";
                    } else if (isUser) {
                      bg = "rgba(239, 68, 68, 0.12)";
                      border = "rgba(239, 68, 68, 0.5)";
                      color = "#fca5a5";
                    }
                  }

                  return (
                    <button
                      key={oIndex}
                      type="button"
                      className="ma-sans ma-press"
                      onClick={() => handleSelect(qIndex, oIndex)}
                      disabled={answeredThis}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        background: bg,
                        border: `1px solid ${border}`,
                        color,
                        fontWeight: 600,
                        fontSize: "clamp(13px, 3.6vw, 15px)",
                        lineHeight: 1.4,
                        cursor: answeredThis ? "default" : "pointer",
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          flex: "0 0 auto",
                          width: "22px",
                          height: "22px",
                          borderRadius: "999px",
                          background: "rgba(0,0,0,0.25)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 900,
                          color: "#cbd5e1",
                        }}
                      >
                        {answeredThis && isCorrect
                          ? "✓"
                          : answeredThis && isUser
                          ? "✗"
                          : String.fromCharCode(65 + oIndex)}
                      </span>
                      <span style={{ flex: 1 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {answeredThis && q.explanation && (
                <div
                  className="ma-sans"
                  style={{
                    marginTop: "14px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.25)",
                    color: "#bbf7d0",
                    fontSize: "clamp(13px, 3.6vw, 14px)",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  💡 {q.explanation}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {allDone && (
        <div
          className="ma-sans"
          style={{
            marginTop: "20px",
            padding: "16px",
            borderRadius: "16px",
            textAlign: "center",
            background:
              correct === quiz.length
                ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(168, 85, 247, 0.2))"
                : "rgba(34, 197, 94, 0.1)",
            border: `1px solid ${
              correct === quiz.length
                ? "rgba(34, 197, 94, 0.4)"
                : "rgba(34, 197, 94, 0.3)"
            }`,
            color: "#f1f5f9",
            fontWeight: 800,
            fontSize: "clamp(14px, 4vw, 16px)",
          }}
        >
          {correct === quiz.length
            ? `🎉 Perfeito — ${correct}/${quiz.length}`
            : correct >= quiz.length - 1
            ? `🔥 Quase — ${correct}/${quiz.length}`
            : correct >= quiz.length / 2
            ? `👍 Bom — ${correct}/${quiz.length}`
            : `📚 Continua — ${correct}/${quiz.length}`}
        </div>
      )}
    </section>
  );
}
