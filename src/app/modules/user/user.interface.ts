import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { IFaculty } from "../faculty/faculty.interface";
import { IStudent } from "../student/student.interface";

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangedAt?: Date;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
  faculty?: Types.ObjectId | IFaculty;
};

// instance methods
export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

// Define a custom type for the User model
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
