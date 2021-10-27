import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/user';

type ResponseType = {
  status: string;
  message: string;
  data: object;
};

export const signIn = createAsyncThunk(
  'user/signin',
  async (values: object, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post<ResponseType>(
        '/api/auth/signin',
        values
      );

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signup',
  async (_, thunkAPI) => {}
);

export const signOut = createAsyncThunk(
  'user/signout',
  async (_, thunkAPI) => {}
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null as User | null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [signIn.pending.type]: (state, action) => {
      state.loading = true;
      state.error = '';
      state.userInfo = null;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [signIn.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      state.userInfo = null;
    },
    [signUp.pending.type]: (state, action) => {
      state.loading = true;
      state.error = '';
      state.userInfo = null;
    },
    [signUp.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [signUp.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.userInfo = null;
    },
    [signOut.pending.type]: (state, action) => {
      state.loading = true;
    },
    [signOut.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userInfo = null;
    },
    [signOut.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.userInfo = null;
    },
  },
});

export default userSlice.reducer;
