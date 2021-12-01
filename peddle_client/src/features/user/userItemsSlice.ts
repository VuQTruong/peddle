import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { State } from '../../store'

type ResponseType = {
  status: string;
  message: string;
  data: {
    items: []
  };
};

export const fetchMyItems = createAsyncThunk(
  'userItems/fetchMyItems',
  async ( _, { rejectWithValue, getState }) => {
    try {
      const { user } =  getState() as State;

      const itemRes = await axios.get<ResponseType>(`/api/items/user/${user.userInfo.id}`);
      return itemRes.data.data.items;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userItemsSlice = createSlice({
  name: 'userItems',
  initialState: {
    userItems: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: {
        /* Sign Up Reducer */
        [fetchMyItems.pending.type]: (state, action) => {
          state.loading = true;
          state.error = '';
          state.userItems = [];
        },
        [fetchMyItems.fulfilled.type]: (state, action) => {
          state.loading = true;
          state.error = '';
          state.userItems = action.payload;
        },
        [fetchMyItems.rejected.type]: (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.userItems = [];
        },
  },
});

export default userItemsSlice.reducer;