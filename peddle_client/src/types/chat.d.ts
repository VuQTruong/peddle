import { Chat } from "./chat";
export interface Chat {
  id: string;
  itemId: Item;
  sender: User;
  receiver: User;
  messages: object[{ userId: string; chat: string; _id: string; time: string }];
}

export interface ChatState {
  chatInfo: Chat;
  loading: boolean;
  error: string;
}

export interface UserMessagesState {
  userMessages: Chat[];
  loading: boolean;
  error: string;
}
