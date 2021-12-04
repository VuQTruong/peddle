import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFilteredItems = createAsyncThunk(
  'items/filter',
  async (queryString: string, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      }: any = await axios.get(`/api/items/filter?${queryString}`);

      return data.items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const filteredItemsSlice = createSlice({
  name: 'filteredItems',
  initialState: {
    loading: false,
    error: null,
    items: [],
  },
  reducers: {},
  extraReducers: {
    [getFilteredItems.pending.type]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getFilteredItems.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    [getFilteredItems.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.items = [];
    },
  },
});

export default filteredItemsSlice.reducer;
