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
    },
    setVerified(state, action) {
      state.isVerified = action.payload;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setVerified, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
