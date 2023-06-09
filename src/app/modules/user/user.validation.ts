import { z } from "zod";

// req validation using ZOD
// body --> object
// data --> object
const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: "Role is required",
      }),
    }),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};

// await createUserZodSchema.parseAsync(req);
