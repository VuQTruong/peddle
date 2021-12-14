import mongoose from "mongoose";
import { User } from "./user";
import Item from "./item";

export interface ChatDocument extends mongoose.Document {
  itemId: typeof Item;
  sender: typeof User;
  receiver: typeof User;
  messages: Object[];
}

const ChatSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "item",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sender",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "receiver",
      required: true,
    },
    messages: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        chat: String,
        time: { type: Date, default: Date.now },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Chat = mongoose.model<ChatDocument>("Chat", ChatSchema);
export default Chat;
