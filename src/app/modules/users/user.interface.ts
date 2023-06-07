import { Model } from "mongoose";

export type IUser = {
  id: string;
  role: string;
  password: string;
};

// Define a custom type for the User model
export type UserModel = Model<IUser, Record<string, unknown>>;
