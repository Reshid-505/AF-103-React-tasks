import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import dataReducer from "./slices/dataSlice"
import basketReducer from "./slices/basketSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    basket:basketReducer,
    data:dataReducer
  },
});

export default store;