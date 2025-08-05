// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./feature/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

// Types untuk hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
