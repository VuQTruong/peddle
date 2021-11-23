import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Item } from '../../types/item';

export const getItemById = createAsyncThunk(
  'item/getItemById',
  async (itemId, thunkAPI) => {}
);

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    item: null as Item | null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getItemById.pending.type]: (state, action) => {
      state.loading = true;
      state.error = '';
      state.item = null;
    },
    [getItemById.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.item = action.payload;
    },
    [getItemById.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.item = null;
    },
  },
});

export default itemSlice.reducer;
