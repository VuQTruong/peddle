import mongoose from 'mongoose';
import { dateFormat } from '../utilities/utils';

export interface ItemDocument extends mongoose.Document {
  name: string;
  category: string;
  images: [string];
  price: number;
  description: string;
  views: number;
  isActive: boolean;
  isSold: boolean;
  matches: number;
  purchasedBy: string;
  postedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [String],
    price: {
      type: Number,
      required: true,
    },
    matches: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    purchasedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.createdAt = dateFormat.format(Date.parse(ret.createdAt));
        ret.updatedAt = dateFormat.format(Date.parse(ret.updatedAt));
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Item = mongoose.model<ItemDocument>('Item', ItemSchema);
export default Item;
