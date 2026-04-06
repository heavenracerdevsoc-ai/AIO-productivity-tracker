import React from "react";
import { useSelector } from "react-redux";

const Statistics = () => {
  const tasks = useSelector((s) => s.tasks || []);
  const habits = useSelector((s) => s.habits || []);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const habitsCount = habits.length;

  return (
    <div style={{ marginTop: 18 }}>
      <h3 style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-dim)", marginBottom: 8 }}>Statistics</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--text-muted)" }}>Completed</span>
          <strong style={{ color: "var(--text)" }}>{completedTasks}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--text-muted)" }}>Pending</span>
          <strong style={{ color: "var(--text)" }}>{pendingTasks}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--text-muted)" }}>Habits</span>
          <strong style={{ color: "var(--text)" }}>{habitsCount}</strong>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
