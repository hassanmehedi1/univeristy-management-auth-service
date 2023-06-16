import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

/**
 * Creates a user in the database.
 * @param user - The user object to be created.
 * @returns The created user object or null.
 */
const createStudentToDB = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // Generate a unique ID for the user

  // Set a default password if it is not provided
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role
  user.role = "student";

  // get academic semester
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate student id
  const session = await mongoose.startSession();
  let newUserAllData = null;
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);

    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // set student _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();

    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user --> student --> academicSemester, academicDepartment, academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }

  return newUserAllData;

  /*
  // // Create the user in the database
  const createdUser = await User.create(user);

  // Check if user creation was successful
  if (!createStudentToDB) {
    throw new ApiError(400, `Failed to create user!`);
  }

  return createdUser;
  */
};

// Export the function as a module
export const userService = {
  createStudentToDB,
};
