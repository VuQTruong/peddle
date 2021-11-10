import { configureStore } from '@reduxjs/toolkit';

import { UserItemsState, UserState } from './types/user';
import { ItemState } from './types/item';
import { SessionState } from './types/session';

import sessionReducer from './features/session/sessionSlice';
import userReducer from './features/user/userSlice';
import itemReducer from './features/item/itemSlice';
import userItemsReducer from './features/user/userItemsSlice';

export interface State {
  session: SessionState;
  user: UserState;
  item: ItemState;
  userItems: UserItemsState;
}

const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    item: itemReducer,
    userItems: userItemsReducer,
  },
});

export default store;
