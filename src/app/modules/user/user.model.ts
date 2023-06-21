import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

// Create a schema for the User model
const userSchema = new Schema<IUser>(
  {
    // Define the properties and their types
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
    // Admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Admin",
    // },
  },
  {
    // Add additional options to the schema
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the User model using the schema
export const User = model<IUser, UserModel>("User", userSchema);
