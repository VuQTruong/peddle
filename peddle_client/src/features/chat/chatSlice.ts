import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { State } from "../../store";
import { Chat } from "../../types/chat";

type ResponseType = {
  status: string;
  message: string;
  data: {
    chatForUser: Chat;
  };
};

export const getChatById = createAsyncThunk(
  "userMessages/getChatById",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as State;
      const { chat } = getState() as State;

      const itemRes = await axios.get<ResponseType>(
        `/api/chat/${chat.chatInfo.id}`
      );
      return itemRes.data.data.chatForUser;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatSlice = createSlice({
  name: "chatInfo",
  initialState: {
    chatInfo: null,
    loading: true,
    error: "",
  },
  reducers: {},
  extraReducers: {
    /* Sign Up Reducer */
    [getChatById.pending.type]: (state, action) => {
      state.loading = true;
      state.error = "";
      state.chatInfo = null;
    },
    [getChatById.fulfilled.type]: (state, action) => {
      state.loading = true;
      state.error = "";
      state.chatInfo = action.payload;
    },
    [getChatById.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.chatInfo = null;
    },
  },
});

export default chatSlice.reducer;
