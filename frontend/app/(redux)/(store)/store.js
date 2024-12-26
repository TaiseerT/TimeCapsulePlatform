"use client";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../(slices)/auth.slice";
import capsulesSlice from "../(slices)/capsules.slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    capsules: capsulesSlice.reducer,
  },
});

export default store;
