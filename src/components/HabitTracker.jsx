import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabit, removeHabit, completeHabit } from "../redux/habitsSlice";
import { increaseHealth, increaseLevel, reSetHealth } from "../redux/userSlice";

const DIFF_STYLES = {
  easy:   { color: "#5a9e7c", bg: "rgba(90,158,124,0.12)", label: "Easy" },
  medium: { color: "#c8a96e", bg: "rgba(200,169,110,0.12)", label: "Medium" },
  hard:   { color: "#b85c5c", bg: "rgba(184,92,92,0.12)", label: "Hard" },
};

const formatDisplayDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

const getDayRange = () => {
  const days = [];
  for (let i = -2; i <= 2; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

const HabitTracker = () => {
  const dispatch = useDispatch();
  const habitData = useSelector((state) => state.habits.habitData);
  const user = useSelector((state) => state.user);
  const [habitName, setHabitName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const habitsForDay = habitData[selectedDate] || [];
  const dayRange = getDayRange();

  const handleAddHabit = () => {
    if (!habitName.trim()) return;
    dispatch(addHabit({
      date: selectedDate,
      habit: { id: Date.now(), name: habitName, difficulty, completed: false },
    }));
    setHabitName("");
  };

  const handleComplete = (habitId, diff) => {
    if (user.health > 90) { dispatch(reSetHealth()); dispatch(increaseLevel()); }
    dispatch(completeHabit({ date: selectedDate, habitId }));
    const xp = diff === "easy" ? 5 : diff === "medium" ? 10 : 15;
    dispatch(increaseHealth(xp));
  };

  const completedCount = habitsForDay.filter((h) => h.completed).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--text)", marginBottom: "4px" }}>
          Habits
        </h1>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
          {completedCount}/{habitsForDay.length} done today
        </p>
      </div>

      {/* Day selector strip */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "28px", overflowX: "auto" }}>
        {dayRange.map((d) => {
          const isSelected = d === selectedDate;
          const isToday = d === new Date().toISOString().split("T")[0];
          const dayHabits = habitData[d] || [];
          const dayDone = dayHabits.filter((h) => h.completed).length;

          return (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: isSelected ? "1px solid var(--accent)" : "1px solid var(--border)",
                background: isSelected ? "var(--accent-dim, rgba(200,169,110,0.12))" : "var(--surface)",
                cursor: "pointer",
                flexShrink: 0,
                textAlign: "center",
                minWidth: "80px",
              }}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: isSelected ? "var(--accent)" : "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}>
                {new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div style={{ fontSize: "16px", fontWeight: "600", color: isSelected ? "var(--text)" : "var(--text-muted)", marginTop: "2px" }}>
                {new Date(d + "T00:00:00").getDate()}
              </div>
              {isToday && (
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", margin: "4px auto 0" }} />
              )}
              {dayHabits.length > 0 && (
                <div style={{ fontSize: "10px", color: "var(--text-dim)", marginTop: "2px", fontFamily: "var(--font-mono)" }}>
                  {dayDone}/{dayHabits.length}
                </div>
              )}
            </button>
          );
        })}

        {/* Custom date fallback */}
        <div style={{ display: "flex", alignItems: "center", paddingLeft: "6px", borderLeft: "1px solid var(--border)" }}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: "8px 10px", fontSize: "12px", border: "1px solid var(--border)" }}
          />
        </div>
      </div>

      {/* Add habit */}
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: "28px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "12px",
      }}>
        <input
          type="text"
          placeholder="New habit for this day..."
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
          style={{ flex: 1, padding: "8px 12px", fontSize: "13px" }}
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{
            padding: "8px 10px",
            fontSize: "12px",
            color: DIFF_STYLES[difficulty].color,
            minWidth: "90px",
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={handleAddHabit}
          style={{
            padding: "8px 18px",
            background: "var(--accent)",
            color: "#0f0f0f",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          Add
        </button>
      </div>

      {/* Habit list */}
      {habitsForDay.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-dim)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "6px" }}>
            {formatDisplayDate(selectedDate)}
          </p>
          <p style={{ fontSize: "12px" }}>No habits logged for this day</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {habitsForDay.map((habit) => {
            const s = DIFF_STYLES[habit.difficulty] || DIFF_STYLES.medium;
            return (
              <div
                key={habit.id}
                className="fade-up"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  background: habit.completed ? "transparent" : "var(--surface)",
                  border: `1px solid ${habit.completed ? "var(--border)" : "var(--border-light)"}`,
                  borderRadius: "7px",
                  opacity: habit.completed ? 0.5 : 1,
                }}
              >
                <button
                  onClick={() => !habit.completed && handleComplete(habit.id, habit.difficulty)}
                  disabled={habit.completed}
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "4px",
                    border: `1.5px solid ${habit.completed ? "var(--green)" : "var(--border-light)"}`,
                    background: habit.completed ? "var(--green)" : "transparent",
                    cursor: habit.completed ? "default" : "pointer",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "10px",
                  }}
                >
                  {habit.completed && "✓"}
                </button>
                <span style={{ flex: 1, fontSize: "13px", color: "var(--text)", textDecoration: habit.completed ? "line-through" : "none" }}>
                  {habit.name}
                </span>
                <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: s.color, background: s.bg, padding: "2px 7px", borderRadius: "4px" }}>
                  {s.label}
                </span>
                <button
                  onClick={() => dispatch(removeHabit({ date: selectedDate, habitId: habit.id }))}
                  style={{ background: "transparent", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "16px", lineHeight: 1, transition: "color 0.15s" }}
                  onMouseEnter={(e) => e.target.style.color = "var(--red)"}
                  onMouseLeave={(e) => e.target.style.color = "var(--text-dim)"}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
