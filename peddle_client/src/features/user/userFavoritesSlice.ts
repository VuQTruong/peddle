import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserFavorites = createAsyncThunk(
  'user/favorites',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data }: any = await axios.get('/api/users/favourite-items');
      return data.data.items;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const removeFavItem = createAsyncThunk(
  'user/removeFavItem',
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`/api/users/favourite/${id}`);
      return id;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

const userFavoritesSlice = createSlice({
  name: 'userFavourites',
  initialState: {
    loading: false,
    error: '',
    favorites: [],
  },
  reducers: {},
  extraReducers: {
    /* Get favorite items */
    [getUserFavorites.pending.type]: (state, action) => {
      state.loading = true;
      state.error = '';
      state.favorites = [];
    },
    [getUserFavorites.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
    },
    [getUserFavorites.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* Remove favorite item */
    [removeFavItem.pending.type]: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    [removeFavItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.favorites = state.favorites.filter(
        (item: any) => item.id !== action.payload
      );
    },
    [removeFavItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userFavoritesSlice.reducer;
