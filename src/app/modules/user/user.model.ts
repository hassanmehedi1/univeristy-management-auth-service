import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IUser, IUserMethods, UserModel } from "./user.interface";

// Create a schema for the User model
const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
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
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    // Add additional options to the schema
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// instance methods
userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 }
  );

  return user;
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);

  return isMatched;
};

// password hashing pre hook
userSchema.pre("save", async function (next) {
  // hashing user password logic
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// Create and export the User model using the schema
export const User = model<IUser, UserModel>("User", userSchema);
