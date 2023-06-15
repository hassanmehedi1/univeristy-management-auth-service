import { z } from "zod";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from "./academicSemester.constants";

// req validation using ZOD
// body --> object
// data --> object
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: "Title is required",
    }),
    year: z.string({
      required_error: "Year is required",
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: "Code is required",
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: "Start Month is required",
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: "End Month is required",
    }),
  }),
});

// Ensure 1 : Route Level : Update --> Give title and Code both else neither

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: "Title is required",
        })
        .optional(),
      year: z
        .string({
          required_error: "Year is required",
        })
        .optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]], {
          required_error: "Code is required",
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: "Start Month is required",
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: "End Month is required",
        })
        .optional(),
    }),
  })
  .refine(
    (data) =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: "Either both title and code should be provided",
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};

// await createUserZodSchema.parseAsync(req);
