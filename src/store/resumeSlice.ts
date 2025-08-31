import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResumeState {
  resumeId: string | null;
  jobId: string | null;
}

const initialState: ResumeState = {
  resumeId: null,
  jobId: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeId: (state, action: PayloadAction<string>) => {
      state.resumeId = action.payload;
    },
    clearResumeId: (state) => {
      state.resumeId = null;
    },
    setJobId: (state, action: PayloadAction<string>) => {
      state.jobId = action.payload;
    },
    clearJobId: (state) => {
      state.jobId = null;
    },
  },
});

export const { setResumeId, clearResumeId, setJobId, clearJobId } = resumeSlice.actions;
export default resumeSlice.reducer;
