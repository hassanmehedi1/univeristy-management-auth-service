import { NextFunction, Request, Response } from "express";
import usersServices from "./users.services";

// Controller function for creating a user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body; // Extract the user object from the request body

    // Call the createUserToDB function from the usersServices module to create the user in the database
    const result = await usersServices.createUserToDB(user);

    // Send a success response with the created user data
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    // Send an error response if there was an error creating the user
    next(err); // went to global error handler
  }
};

// Export the createUser function as the default export
export default {
  createUser,
};
