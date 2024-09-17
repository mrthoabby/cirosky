import { configureStore } from "@reduxjs/toolkit";
import { sectionsReducer } from "./sections/sectionsSlice";

export const appGlobalStateStore = configureStore({
  reducer: {
    sectionsReducer,
  },
});

export type RootState = ReturnType<typeof appGlobalStateStore.getState>;
export type AppDispatch = typeof appGlobalStateStore.dispatch;
