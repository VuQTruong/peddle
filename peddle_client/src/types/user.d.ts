export interface User {
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
  user: User;
  loading: boolean;
  error: string;
}
