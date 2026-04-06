import { createSlice } from "@reduxjs/toolkit";

const dayReviewSlice = createSlice({
  name: "dayReview",
  initialState: [],
  reducers: {
    removeDayReview: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    addDayReview: (state, action) => {
      state.push({
        date: action.payload.date,
        review: action.payload.review,
        mood: action.payload.mood || null,
      });
    },
  },
});

export const { addDayReview, removeDayReview } = dayReviewSlice.actions;
export default dayReviewSlice.reducer;
