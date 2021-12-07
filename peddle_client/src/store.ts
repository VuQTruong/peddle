import { configureStore } from "@reduxjs/toolkit";

import { UserItemsState, UserState } from "./types/user";
import { ItemState } from "./types/item";
import { ChatState, UserMessagesState } from "./types/chat";
import { SessionState } from "./types/session";

import sessionReducer from "./features/session/sessionSlice";
import userReducer from "./features/user/userSlice";
import itemReducer from "./features/item/itemSlice";
import userItemsReducer from "./features/user/userItemsSlice";
import userMessagesSlice from "./features/chat/userMessagesSlice";
import chatReducer from "./features/chat/chatSlice";

export interface State {
  session: SessionState;
  user: UserState;
  item: ItemState;
  userItems: UserItemsState;
  chat: ChatState;
  userMessages: UserMessagesState;
}

const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    item: itemReducer,
    userItems: userItemsReducer,
    userMessages: userMessagesSlice,
    chat: chatReducer,
  },
});

export default store;
