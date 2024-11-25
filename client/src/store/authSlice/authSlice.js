import { createSlice } from "@reduxjs/toolkit";

const state = {
  user: null,
  isVerified: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: state,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setVerified(state, action) {
      state.isVerified = action.payload;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isVerified = false;
    },
  },
});

export const { setUser, setVerified, setAuthenticated, logout } =
  userSlice.actions;

export default userSlice.reducer;
