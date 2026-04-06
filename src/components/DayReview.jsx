import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDayReview } from "../redux/dayReviewSlice";
import { format } from "date-fns";

const MOODS = [
  { emoji: "🔥", label: "Crushing it" },
  { emoji: "✅", label: "Solid day" },
  { emoji: "😐", label: "Average" },
  { emoji: "😓", label: "Rough" },
];

const DayReview = () => {
  const [review, setReview] = useState("");
  const [mood, setMood] = useState(null);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.dayReviews);

  const handleSubmit = () => {
    if (!review.trim()) return;
    const today = format(new Date(), "dd-MM-yyyy");
    dispatch(addDayReview({ date: today, review, mood: mood?.label || null }));
    setReview("");
    setMood(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--text)", marginBottom: "4px" }}>
          Journal
        </h1>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
          {reviews.length} {reviews.length === 1 ? "entry" : "entries"} written
        </p>
      </div>

      {/* Compose */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "32px",
      }}>
        {/* Mood selector */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
          {MOODS.map((m) => (
            <button
              key={m.label}
              onClick={() => setMood(mood?.label === m.label ? null : m)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: `1px solid ${mood?.label === m.label ? "var(--accent)" : "var(--border)"}`,
                background: mood?.label === m.label ? "rgba(200,169,110,0.12)" : "transparent",
                cursor: "pointer",
                fontSize: "12px",
                color: mood?.label === m.label ? "var(--accent)" : "var(--text-muted)",
                fontFamily: "var(--font-sans)",
                transition: "all 0.15s",
              }}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        <textarea
          placeholder={`How did ${format(new Date(), "MMMM d")} go?`}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={5}
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: "13px",
            resize: "vertical",
            lineHeight: "1.7",
            border: "1px solid var(--border)",
            background: "var(--surface-2)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
          <button
            onClick={handleSubmit}
            disabled={!review.trim()}
            style={{
              padding: "8px 22px",
              background: review.trim() ? "var(--accent)" : "var(--surface-2)",
              color: review.trim() ? "#0f0f0f" : "var(--text-dim)",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              fontSize: "13px",
              cursor: review.trim() ? "pointer" : "default",
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
            }}
          >
            Save Entry
          </button>
        </div>
      </div>

      {/* Past entries */}
      {reviews.length > 0 && (
        <div>
          <p style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
            Previous entries
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[...reviews].reverse().map((r, i) => (
              <div
                key={i}
                className="fade-up"
                style={{
                  padding: "16px 18px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                    {r.date}
                  </span>
                  {r.mood && (
                    <span style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      background: "var(--surface-2)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      border: "1px solid var(--border)",
                    }}>
                      {MOODS.find((m) => m.label === r.mood)?.emoji} {r.mood}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "13px", color: "var(--text)", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
                  {r.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviews.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-dim)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "6px", fontStyle: "italic" }}>
            No entries yet
          </p>
          <p style={{ fontSize: "12px" }}>Reflect on your day and write something</p>
        </div>
      )}
    </div>
  );
};

export default DayReview;
