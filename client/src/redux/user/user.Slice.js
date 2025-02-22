import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {}, // ✅ Ensure user is an object
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // ✅ Store as an object, NOT a string
    },
    removeUser: (state) => {
      state.isLoggedIn = false;
      state.user = {}; // ✅ Reset to empty object
    },
  },
});

// Correct action exports
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
