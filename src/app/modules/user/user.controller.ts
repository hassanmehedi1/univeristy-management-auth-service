import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { userService } from "./user.services";

// Controller function for creating a user
const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body; // Extract the user object from the request body

    // Call the createUserToDB function from the usersServices module to create the user in the database
    const result = await userService.createStudentToDB(student, userData);

    // Send a success response with the created user data
    // res.status(200).json({
    //   success: true,
    //   message: "User created successfully",
    //   data: result,
    // });
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  }
);

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await userService.createFacultyToDB(faculty, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty created successfully!",
      data: result,
    });
  }
);

// Export the createUser function as the default export
export const UserController = {
  createStudent,
  createFaculty,
};
