import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        username: action.payload?.username,
        email: action.payload?.email,
        country: action.payload?.country,
      };
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
