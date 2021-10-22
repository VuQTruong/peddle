import { configureStore } from '@reduxjs/toolkit';

import { UserState } from './types/user';
import { ItemState } from './types/item';

import userReducer from './features/user/userSlice';
import itemReducer from './features/item/itemSlice';

export interface State {
  user: UserState;
  item: ItemState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
  },
});

export default store;
