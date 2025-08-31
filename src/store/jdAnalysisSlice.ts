// src/store/jdAnalysisSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JDAnalysisState {
  resumeId: string | null;
  jdId: string | null;
  confidenceScore: number | null;
  goodVerdict: string;
  bulletinPoints: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: JDAnalysisState = {
  resumeId: null,
  jdId: null,
  confidenceScore: null,
  goodVerdict: "",
  bulletinPoints: [],
  status: "idle",
  error: null,
};

const jdAnalysisSlice = createSlice({
  name: "jdAnalysis",
  initialState,
  reducers: {
    setAnalysis: (
      state,
      action: PayloadAction<Omit<JDAnalysisState, "status" | "error">>
    ) => {
      state.resumeId = action.payload.resumeId;
      state.jdId = action.payload.jdId;
      state.confidenceScore = action.payload.confidenceScore;
      state.goodVerdict = action.payload.goodVerdict;
      state.bulletinPoints = action.payload.bulletinPoints;
      state.status = "succeeded";
      state.error = null;
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    clearAnalysis: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setAnalysis, setLoading, setError, clearAnalysis } =
  jdAnalysisSlice.actions;

export default jdAnalysisSlice.reducer;
