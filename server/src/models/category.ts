import mongoose from 'mongoose';
import { dateFormat } from '../utilities/utils';

export interface CategoryDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);
export default Category;
