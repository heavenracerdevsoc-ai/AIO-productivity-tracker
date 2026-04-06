import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    health: 100,
    level: 1,
    username: null,
    isAuthenticated: false,
  },
  reducers: {
    increaseHealth: (state, action) => {
      state.health += action.payload;
    },
    increaseLevel: (state) => {
      state.level += 1;
    },
    reSetHealth: (state) => {
      state.health = 0;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    login: (state, action) => {
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.username = null;
      state.isAuthenticated = false;
    },
  },
});

export const { increaseHealth, increaseLevel, reSetHealth, setLevel, login, logout } =
  userSlice.actions;
export default userSlice.reducer;
