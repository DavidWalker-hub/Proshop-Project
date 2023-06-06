import mongoose, { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUserMethods {
  matchPassword: (password: string) => Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema: Schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
