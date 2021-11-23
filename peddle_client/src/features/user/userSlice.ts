import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { State } from '../../store';

type ResponseType = {
  status: string;
  message: string;
  data: {
    id: string;
  };
};

type UserResponse = {
  status: string;
  message: string;
  data: {
    user: any;
  };
};

export const signIn = createAsyncThunk(
  'user/signin',
  async (values: object, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data }  = await axios.post<ResponseType>(
        '/api/auth/signin',
        values
      );

      const userRes = await axios.get<UserResponse>(
        `/api/users/${data.data.id}`,
        values
      );

      return userRes.data.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk('user/signup',
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
    await axios.post<ResponseType>('/api/auth/signout');

    return null;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchCurrUser = createAsyncThunk('user/fetchCurrUser', async (_, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;

  try {
    const { user } =  getState() as State;
    const { data } = await axios.get<ResponseType>(`/api/users/${user.userInfo.id}`);
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('users/update', async(values: object, thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  try {
    const {data} = await axios.patch<ResponseType>(
      '/api/users/current-user',
      values
    );
    return data.data;
  }
  catch (error:any) {
    return rejectWithValue(error.response.data.message);
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

    /* Update User Reducer */
    [updateUser.pending.type]: (state, action) => {
      state.loading = true;
      localStorage.removeItem('userInfo');
    },
    [updateUser.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      // Update userInfo to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    [updateUser.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.userInfo = null;
    },

    // Fetch Curr User Reducer
    [fetchCurrUser.pending.type]: (state, action) => {
      state.loading = true;
    },
    [fetchCurrUser.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [fetchCurrUser.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.userInfo = null;
    },
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;