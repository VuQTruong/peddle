export interface Item {
  name: string;
  category: string;
  images: [string];
  price: number;
  description: string;
  views: number;
  isActive: boolean;
  isSold: boolean;
  postedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemState {
  item: Item;
  loading: boolean;
  error: '';
}
