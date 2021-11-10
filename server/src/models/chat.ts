import mongoose from "mongoose";
import { dateFormat } from "../utilities/utils";
import { User } from "./user";
import Item from "./item";

// // an interface that describe the properties
// // that are required to create a new user
// interface ChatAttrs {
//   item: typeof Item;
//   user1: typeof User;
//   user2: typeof User;
//   chatArr: string[];
// }

// // an interface that describe the properties
// // that a User Model has
// interface ChatModel extends mongoose.Model<ChatDoc> {
//   build(attrs: ChatAttrs): ChatDoc;
// }

// // an inteface that describes the properties
// // that a User Document has
// interface ChatDoc extends mongoose.Document {
//   item: typeof Item;
//   user1: typeof User;
//   user2: typeof User;
//   chatArr: string[];
// }

// const chatSchema = new mongoose.Schema({
//   item: {
//     type: Item,
//     required: true,
//   },
//   user1: {
//     type: User,
//     required: true,
//   },
//   user2: {
//     type: User,
//     required: true,
//   },
//   chatArr: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Item",
//     },
//   ],
// });

// chatSchema.statics.build = (attrs: ChatAttrs) => {
//   return new Chat(attrs);
// };

// const Chat = mongoose.model<ChatDoc, ChatModel>("Chat", chatSchema);

// export { Chat };

export interface ChatDocument extends mongoose.Document {
  item: typeof Item;
  user1: typeof User;
  user2: typeof User;
  chatArr: Object[];
}

const ChatSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: true,
  },
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user1",
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user2",
    required: true,
  },
  chatArr: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      chat: String,
      time: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model<ChatDocument>("Chat", ChatSchema);
export default Chat;
