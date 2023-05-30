import mongoose, { Document, Schema, Types, model } from "mongoose";
import { IUser } from "./userModel";

export interface IReview extends Document {
  name: string;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export interface IProduct extends Document {
  user: IUser["_id"];
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  reviews: IReview;
  rating: number;
  numReviews: number;
}

const productSchema = new Schema<IProduct>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
