import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessionTTL: 0,
  },
  reducers: {
    setSessionTTL: (state, action: PayloadAction<number>) => {
      state.sessionTTL = action.payload;
    },
  },
});

export const { setSessionTTL } = sessionSlice.actions;
export default sessionSlice.reducer;
