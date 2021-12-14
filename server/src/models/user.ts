import mongoose from 'mongoose';
import { hashPassword } from '../utilities/password-util';

// an interface that describe the properties
// that are required to create a new user
interface UserAttrs {
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  password: string;
  lat: number;
  lng: number;
  postalCode: string;
}

// an interface that describe the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an inteface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  password: string;
  lat: number;
  lng: number;
  rating: number;
  numRates: number;
  totalRatings: number;
  postalCode: string;
  isPremiumMember: boolean;
  dislikedItemIds: string[];
  seenItems: string[];
  postedItems: string[];
  soldItems: string[];
  purchasedItems: string[];
  favouriteItems: string[];
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numRates:{
      type: Number,
      default: 0,
    },
    totalRatings:{
      type: Number,
      default: 0
    },
    postalCode: {
      type: String,
      required: true,
    },
    isPremiumMember: {
      type: Boolean,
      required: true,
    },
    dislikedItemIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    seenItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    postedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    purchasedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    soldItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    favouriteItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.seenItems;
        delete ret.numRates;
        delete ret.totalRatings;
      },
    },
  }
);
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await hashPassword(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
