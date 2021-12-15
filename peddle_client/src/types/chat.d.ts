import { Chat } from "./chat";
import { User } from "./user";
export interface Chat {
  id: string;
  itemId: Item;
  sender: User;
  receiver: User;
  isBlocked: boolean;
  blockedByUserId: User;
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
