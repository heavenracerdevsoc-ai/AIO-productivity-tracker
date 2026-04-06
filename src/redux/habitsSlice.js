import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habitData: {}, // Stores habits by date
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      const { date, habit } = action.payload;
      if (!state.habitData[date]) {
        state.habitData[date] = [];
      }
      state.habitData[date].push(habit);
    },
    removeHabit: (state, action) => {
      const { date, habitId } = action.payload;
      if (state.habitData[date]) {
        state.habitData[date] = state.habitData[date].filter(
          (habit) => habit.id !== habitId
        );
      }
    },
    completeHabit: (state, action) => {
      const { date, habitId } = action.payload;
      const habitsForDate = state.habitData[date];
      const habit = habitsForDate.find((habit) => habit.id === habitId);
      if (habit) {
        habit.completed = true;
      }
    },
  },
});

export const { addHabit, removeHabit, completeHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
