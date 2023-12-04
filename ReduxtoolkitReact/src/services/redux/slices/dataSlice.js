import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setdata: (state, action) => {
      state.data=[...action.payload];
    },
    adddata: (state, action) => {
      state.data=[...state.data,action.payload];
    },
  },
});

export const { setdata, adddata } = dataSlice.actions;

export default dataSlice.reducer;