import { configureStore } from '@reduxjs/toolkit';

import { UserState } from './types/user';
import { ItemState } from './types/item';
import { SessionState } from './types/session';

import sessionReducer from './features/session/sessionSlice';
import userReducer from './features/user/userSlice';
import itemReducer from './features/item/itemSlice';

export interface State {
  session: SessionState;
  user: UserState;
  item: ItemState;
}

const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    item: itemReducer,
  },
});

export default store;
