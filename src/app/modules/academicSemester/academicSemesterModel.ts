import { Schema, model } from "mongoose";
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
      type: Number,
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
  }
);

// Create and export the academic semester model using the schema
export const User = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema
);
