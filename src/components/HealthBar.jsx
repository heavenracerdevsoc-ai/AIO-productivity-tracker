import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "../redux/userSlice";

const LEAGUES = [
  { min: 100, src: "src/assets/titan_league.png", name: "Titan", color: "#e8c84a" },
  { min: 75,  src: "src/assets/champion_league.png", name: "Champion", color: "#b87fe0" },
  { min: 60,  src: "src/assets/crystal_league.png", name: "Crystal", color: "#5ab8e0" },
  { min: 50,  src: "src/assets/master_league.png", name: "Master", color: "#e07a5a" },
  { min: 20,  src: "src/assets/gold_league.png", name: "Gold", color: "#c8a96e" },
  { min: 10,  src: "src/assets/silver_league.png", name: "Silver", color: "#aaaaaa" },
  { min: 5,   src: "src/assets/bronze_league.png", name: "Bronze", color: "#b87d5a" },
  { min: 0,   src: "src/assets/no_league.png", name: "Unranked", color: "#7a7570" },
];

const getLeague = (level) => LEAGUES.find((l) => level >= l.min) || LEAGUES[LEAGUES.length - 1];

const HealthBar = () => {
  const dispatch = useDispatch();
  const health = useSelector((state) => state.user.health);
  const level = useSelector((state) => state.user.level);
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState(level);

  const league = getLeague(level);

  const nextLeague = [...LEAGUES].reverse().find((l) => l.min > level);
  const toNext = nextLeague ? nextLeague.min - level : 0;

  return (
    <div>
      <p style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
        Your status
      </p>

      {/* League badge */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{
          width: "80px",
          height: "80px",
          margin: "0 auto 12px",
          background: "var(--surface-2)",
          borderRadius: "50%",
          border: `2px solid ${league.color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          <img src={league.src} alt={league.name} style={{ width: "52px", height: "52px", objectFit: "contain" }} />
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: league.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {league.name}
        </p>
        {toNext > 0 && (
          <p style={{ fontSize: "10px", color: "var(--text-dim)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
            {toNext} lvls to {nextLeague.name}
          </p>
        )}
      </div>

      {/* Level */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "14px 16px",
        marginBottom: "16px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Level
          </span>
          {editing ? (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(parseInt(e.target.value) || 1)}
                style={{ width: "60px", padding: "2px 6px", fontSize: "13px", textAlign: "center" }}
                autoFocus
              />
              <button
                onClick={() => { dispatch(setLevel(inputVal)); setEditing(false); }}
                style={{ fontSize: "11px", color: "var(--accent)", background: "transparent", border: "none", cursor: "pointer" }}
              >
                Save
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "var(--text)" }}>
                {level}
              </span>
              <button
                onClick={() => { setInputVal(level); setEditing(true); }}
                style={{ fontSize: "10px", color: "var(--text-dim)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)" }}
              >
                edit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Health / XP */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "14px 16px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            XP to next level
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
            {health}/100
          </span>
        </div>
        {/* Bar track */}
        <div style={{ height: "6px", background: "var(--surface-2)", borderRadius: "3px", overflow: "hidden", border: "1px solid var(--border)" }}>
          <div
            style={{
              height: "100%",
              width: `${Math.min(health, 100)}%`,
              background: health > 60 ? "var(--green)" : health > 30 ? "var(--accent)" : "var(--red)",
              borderRadius: "3px",
              transition: "width 0.5s cubic-bezier(0.4,0,0.2,1), background 0.3s",
            }}
          />
        </div>
        <p style={{ fontSize: "10px", color: "var(--text-dim)", marginTop: "8px", fontFamily: "var(--font-mono)" }}>
          Complete tasks and habits to gain XP
        </p>
      </div>

      {/* XP legend */}
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {[
          { label: "Easy task", xp: "+10 XP", color: "var(--green)" },
          { label: "Medium task", xp: "+20 XP", color: "var(--accent)" },
          { label: "Hard task", xp: "+30 XP", color: "var(--red)" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{item.label}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: item.color }}>{item.xp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthBar;
