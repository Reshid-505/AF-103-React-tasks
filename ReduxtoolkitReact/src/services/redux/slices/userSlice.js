import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    "name": "Reshid",
    "pass": "505",
    "isAdmin": true,
    "id": "1"
    },

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user={...action.payload};
    },
    logoutUser: (state,) => {
      state.user = {};
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;