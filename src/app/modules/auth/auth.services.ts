import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { IRefreshTokenResponse } from "../user/user.interface";
import { User } from "../user/user.model";
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
} from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // check user exist
  const user = new User();

  /*
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();
  */

  // access to my instance method
  const isUserExist = await user.isUserExist(id);

  //check is user exist
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does not Exist");
  }

  /*
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  */

  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is Incorrect");
  }

  // create access token & refresh token
  /*
  const accessToken = jwt.sign(
    {
      id: isUserExist?.id,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );
  */
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const user = new User();
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh Token");
  }

  const { userId } = verifiedToken;

  // checking deleted users refresh token
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePasswordToDB = async (
  users: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const user = new User();

  //check is user exist
  const isUserExist = await user.isUserExist(users?.userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does not Exist");
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Password is Incorrect");
  }

  // hash password before saving
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const query = { id: users?.userId };
  const updatedData = {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  };

  // update password
  await User.findOneAndUpdate(query, updatedData);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePasswordToDB,
};