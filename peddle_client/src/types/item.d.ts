export interface Item {
  id: string;
  name: string;
  category: string;
  images: [string];
  price: number;
  description: string;
  views: number;
  matches: number;
  isActive: boolean;
  isSold: boolean;
  purchasedBy: string;
  postedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemState {
  item: Item;
  loading: boolean;
  error: '';
}
