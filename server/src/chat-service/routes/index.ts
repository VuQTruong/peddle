import { createChatRouter } from "./create-chat";
import { getChatsRouter } from "./get-chat-by-id";
import { updateChatRouter } from "./update-chat";
import { deleteAllChatsRouter } from "./delete-all-chats";
import { deleteChatRouter } from "./delete-chat";
import { getChatsByUserRouter } from "./get-chat-by-user";

export {
  createChatRouter,
  getChatsRouter,
  updateChatRouter,
  getChatsByUserRouter,
  deleteChatRouter,
  deleteAllChatsRouter
};
