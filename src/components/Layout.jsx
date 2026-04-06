import React, { useState } from "react";
import HabitTracker from "./HabitTracker";
import ToDoList from "./ToDoList";
import DayReview from "./DayReview";
import HealthBar from "./HealthBar";
import Statistics from "./Statistics";
import ThemeToggle from "./ThemeToggle";
import Settings from "./Settings";

const NAV = [
  { id: "tasks", label: "Tasks" },
  { id: "habits", label: "Habits" },
  { id: "journal", label: "Journal" },
];

const Layout = () => {
  const [active, setActive] = useState("tasks");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <header style={{
        borderBottom: "1px solid var(--border)",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "56px",
        position: "sticky",
        top: 0,
        background: "var(--bg)",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <span style={{
            fontFamily: "var(--font-serif)",
            fontSize: "18px",
            color: "var(--accent)",
            letterSpacing: "0.01em",
          }}>
            Productiv
          </span>
          <nav style={{ display: "flex", gap: "4px" }}>
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: active === item.id ? "600" : "400",
                  color: active === item.id ? "var(--text)" : "var(--text-muted)",
                  background: active === item.id ? "var(--surface-2)" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Settings />
          <ThemeToggle />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)" }}>
            {today}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, display: "flex", gap: 0 }}>
        {/* Content panel */}
        <div style={{ flex: 1, padding: "32px", minWidth: 0 }}>
          {active === "tasks" && <ToDoList />}
          {active === "habits" && <HabitTracker />}
          {active === "journal" && <DayReview />}
        </div>

        {/* Right sidebar — always visible */}
        <aside style={{
          width: "280px",
          borderLeft: "1px solid var(--border)",
          padding: "32px 24px",
          flexShrink: 0,
        }}>
          <HealthBar />
          <Statistics />
        </aside>
      </main>
    </div>
  );
};

export default Layout;
