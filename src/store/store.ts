// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';
import jdAnalysisReducer from './jdAnalysisSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    jdAnalysis: jdAnalysisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
