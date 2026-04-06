import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    addTask: (state, action) => {
      // ensure minimal shape and support optional `repeat`
      const payload = { completed: false, repeat: null, ...action.payload };
      state.push(payload);
    },
    completeTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.completed = true;
      else task.completed = false;
      // If task has a repeat rule, re-create it as pending
      if (task && task.repeat) {
        const next = { ...task, id: Date.now(), completed: false };
        state.push(next);
      }
    },
  },
});

export const { addTask, completeTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
