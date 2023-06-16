"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constants_1 = require("./academicSemester.constants");
// req validation using ZOD
// body --> object
// data --> object
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constants_1.academicSemesterTitles], {
            required_error: "Title is required",
        }),
        year: zod_1.z.string({
            required_error: "Year is required",
        }),
        code: zod_1.z.enum([...academicSemester_constants_1.academicSemesterCodes], {
            required_error: "Code is required",
        }),
        startMonth: zod_1.z.enum([...academicSemester_constants_1.academicSemesterMonths], {
            required_error: "Start Month is required",
        }),
        endMonth: zod_1.z.enum([...academicSemester_constants_1.academicSemesterMonths], {
            required_error: "End Month is required",
        }),
    }),
});
// Ensure 1 : Route Level : Update --> Give title and Code both else neither
const updateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemester_constants_1.academicSemesterTitles], {
            required_error: "Title is required",
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: "Year is required",
        })
            .optional(),
        code: zod_1.z
            .enum([...academicSemester_constants_1.academicSemesterCodes], {
            required_error: "Code is required",
        })
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemester_constants_1.academicSemesterMonths], {
            required_error: "Start Month is required",
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constants_1.academicSemesterMonths], {
            required_error: "End Month is required",
        })
            .optional(),
    }),
})
    .refine((data) => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: "Either both title and code should be provided",
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};
// await createUserZodSchema.parseAsync(req);
