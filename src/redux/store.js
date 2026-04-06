import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import habitsSlice from "./habitsSlice";
import userSlice from "./userSlice";
import dayReviewSlice from "./dayReviewSlice";
import { loadState, saveState } from "../utils/localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    habits: habitsSlice,
    user: userSlice,
    dayReviews: dayReviewSlice,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
