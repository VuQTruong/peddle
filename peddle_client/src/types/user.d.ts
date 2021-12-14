import { Item } from './item';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  lat: number;
  lng: number;
  postalCode: string;
  isPremiumMember: boolean;
  postedItems: string[];
  purchasedItems: string[];
  favouriteItems: string[];
}

export interface UserState {
  userInfo: User;
  loading: boolean;
  error: string;
}

export interface UserItemsState {
  userItems: Item[];
  loading: boolean;
  error: string;
}

export interface UserFavoritesState {
  favorites: Item[];
  loading: boolean;
  error: string;
}
