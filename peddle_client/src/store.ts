import { configureStore } from '@reduxjs/toolkit';

import { UserFavoritesState, UserItemsState, UserState } from './types/user';
import { FilteredItemsState, ItemState } from './types/item';
import { SessionState } from './types/session';

import sessionReducer from './features/session/sessionSlice';
import userReducer from './features/user/userSlice';
import itemReducer from './features/item/itemSlice';
import userItemsReducer from './features/user/userItemsSlice';
import userFavoritesReducer from './features/user/userFavoritesSlice';
import filteredItemsReducer from './features/item/filteredItemsSlice';

export interface State {
  session: SessionState;
  user: UserState;
  item: ItemState;
  userItems: UserItemsState;
  userFavorites: UserFavoritesState;
  filteredItems: FilteredItemsState;
}

const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    item: itemReducer,
    userItems: userItemsReducer,
    userFavorites: userFavoritesReducer,
    filteredItems: filteredItemsReducer,
  },
});

export default store;
