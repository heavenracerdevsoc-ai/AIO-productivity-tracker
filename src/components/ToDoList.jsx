import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, completeTask, removeTask } from "../redux/tasksSlice";
import { showNotification } from "../utils/notifications";
import { increaseHealth, increaseLevel, reSetHealth } from "../redux/userSlice";

const DIFF_COLORS = {
  Easy: { color: "#5a9e7c", bg: "rgba(90,158,124,0.12)" },
  Medium: { color: "#c8a96e", bg: "rgba(200,169,110,0.12)" },
  Hard: { color: "#b85c5c", bg: "rgba(184,92,92,0.12)" },
};

const ToDoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.user);
  const [taskName, setTaskName] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState("Medium");
  const [taskRepeat, setTaskRepeat] = useState("none");

  const handleCompleteTask = (taskId, diff) => {
    dispatch(completeTask(taskId));
    const xp = diff === "Easy" ? 10 : diff === "Medium" ? 20 : 30;
    dispatch(increaseHealth(xp));
    showNotification("Task completed", { body: "Nice job — task completed!" });
  };

  if (user.health >= 100) {
    dispatch(increaseLevel());
    dispatch(reSetHealth());
  }

  const handleAddTask = () => {
    if (!taskName.trim()) return;
    const repeat = taskRepeat === "none" ? null : taskRepeat;
    dispatch(addTask({ id: Date.now(), name: taskName, difficulty: taskDifficulty, repeat }));
    setTaskName("");
    setTaskRepeat("none");
  };

  const pending = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--text)", marginBottom: "4px" }}>
          Tasks
        </h1>
        <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
          {pending.length} pending · {done.length} done
        </p>
      </div>

      {/* Add task */}
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: "32px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "12px",
      }}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          style={{ flex: 1, padding: "8px 12px", fontSize: "13px", border: "1px solid var(--border)", background: "var(--surface-2)" }}
        />
        <select
          value={taskDifficulty}
          onChange={(e) => setTaskDifficulty(e.target.value)}
          style={{
            padding: "8px 10px",
            fontSize: "12px",
            border: "1px solid var(--border)",
            color: DIFF_COLORS[taskDifficulty].color,
            minWidth: "90px",
          }}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select value={taskRepeat} onChange={(e) => setTaskRepeat(e.target.value)} style={{ padding: "8px 10px", fontSize: "12px", border: "1px solid var(--border)", minWidth: "110px" }}>
          <option value="none">No repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button
          onClick={handleAddTask}
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
            whiteSpace: "nowrap",
          }}
        >
          Add
        </button>
      </div>

      {/* Pending tasks */}
      {pending.length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
            In progress
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {pending.map((task, i) => (
              <TaskRow key={task.id} task={task} onComplete={handleCompleteTask} onDelete={(id) => dispatch(removeTask(id))} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Done tasks */}
      {done.length > 0 && (
        <div>
          <p style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
            Completed
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {done.map((task, i) => (
              <TaskRow key={task.id} task={task} onComplete={handleCompleteTask} onDelete={(id) => dispatch(removeTask(id))} index={i} />
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-dim)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "6px" }}>Nothing here yet</p>
          <p style={{ fontSize: "12px" }}>Add your first task above</p>
        </div>
      )}
    </div>
  );
};

const TaskRow = ({ task, onComplete, onDelete }) => {
  const diff = DIFF_COLORS[task.difficulty] || DIFF_COLORS.Medium;

  return (
    <div
      className="fade-up"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 14px",
        background: task.completed ? "transparent" : "var(--surface)",
        border: `1px solid ${task.completed ? "var(--border)" : "var(--border-light)"}`,
        borderRadius: "7px",
        opacity: task.completed ? 0.5 : 1,
        transition: "opacity 0.2s",
      }}
    >
      {/* Checkbox */}
      <button
        onClick={() => !task.completed && onComplete(task.id, task.difficulty)}
        disabled={task.completed}
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "4px",
          border: `1.5px solid ${task.completed ? "var(--green)" : "var(--border-light)"}`,
          background: task.completed ? "var(--green)" : "transparent",
          cursor: task.completed ? "default" : "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "10px",
        }}
      >
        {task.completed && "✓"}
      </button>

      {/* Task name */}
      <span style={{
        flex: 1,
        fontSize: "13px",
        color: "var(--text)",
        textDecoration: task.completed ? "line-through" : "none",
      }}>
        {task.name}
      </span>

      {/* Difficulty badge */}
      <span style={{
        fontSize: "10px",
        fontFamily: "var(--font-mono)",
        color: diff.color,
        background: diff.bg,
        padding: "2px 7px",
        borderRadius: "4px",
      }}>
        {task.difficulty}
      </span>

      {/* Delete */}
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: "transparent",
          border: "none",
          color: "var(--text-dim)",
          cursor: "pointer",
          fontSize: "16px",
          lineHeight: 1,
          padding: "0 2px",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => e.target.style.color = "var(--red)"}
        onMouseLeave={(e) => e.target.style.color = "var(--text-dim)"}
      >
        ×
      </button>
    </div>
  );
};

export default ToDoList;
