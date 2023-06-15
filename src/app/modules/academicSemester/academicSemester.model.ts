import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from "./academicSemester.constants";
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from "./academicSemester.interface";

// Create a schema for the User model
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    // Define the properties and their types
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
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

// Handling same year and same semester issue using pre hook

academicSemesterSchema.pre("save", async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Academic Semester already exist!");
  }
  next();
});

// Create and export the academic semester model using the schema
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema
);
