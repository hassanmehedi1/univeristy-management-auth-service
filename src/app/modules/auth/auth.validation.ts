import { z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "ID is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old Password is required",
    }),
    newPassword: z.string({
      required_error: "New Password is required",
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
