import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { State } from "../../store";

type ResponseType = {
  status: string;
  message: string;
  data: {
    chatForUser: [];
  };
};

export const getChatByUser = createAsyncThunk(
  "userMessages/getChatByUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState() as State;
      const itemRes = await axios.get<ResponseType>(
        `/api/chat/user/${user.userInfo.id}`
      );
      return itemRes.data.data.chatForUser;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userMessagesSlice = createSlice({
  name: "userMessages",
  initialState: {
    userMessages: [],
    loading: true,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getChatByUser.pending.type]: (state, action) => {
      state.loading = true;
      state.error = "";
      state.userMessages = [];
    },
    [getChatByUser.fulfilled.type]: (state, action) => {
      state.loading = true;
      state.error = "";
      state.userMessages = action.payload;
    },
    [getChatByUser.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.userMessages = [];
    },
  },
});

export default userMessagesSlice.reducer;
