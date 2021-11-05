import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  async (values: object, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.post<ResponseType>(
        '/api/auth/signup',
        values
      );

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signOut = createAsyncThunk('user/signout', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const { data } = await axios.post<ResponseType>('/api/auth/signout');

    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')!)
      : null,
    loading: false,
    error: '',
  },
  reducers: {
    resetUserState: (state) => {
      state.error = '';
      state.loading = false;
      state.userInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')!)
        : null;
    },
  },
  extraReducers: {
    /* Sign In Reducer*/
    [signIn.pending.type]: (state, action) => {
      state.loading = true;
      state.error = '';
      state.userInfo = null;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;

      // Save userInfo to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    [signIn.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      state.userInfo = null;
    },

    /* Sign Up Reducer */
    [signUp.pending.type]: (state, action) => {
      state.loading = true;
      state.error = '';
      state.userInfo = null;
    },
    [signUp.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;

      // Save userInfo to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    [signUp.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.userInfo = null;
    },

    /* Sign Out Reducer */
    [signOut.pending.type]: (state, action) => {
      state.loading = true;
    },
    [signOut.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userInfo = null;

      // Remove userInfo from localStorage
      localStorage.removeItem('userInfo');
    },
    [signOut.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.userInfo = null;
    },
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
