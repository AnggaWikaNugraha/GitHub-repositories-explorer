// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./feature/searchSlice";
import UserExpand from "./feature/UserExpand";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    userUI: UserExpand,
  },
});

// Types untuk hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
