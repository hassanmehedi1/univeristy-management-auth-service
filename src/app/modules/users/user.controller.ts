import { RequestHandler } from "express";
import { userService } from "./user.services";

// Controller function for creating a user
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body; // Extract the user object from the request body

    // Call the createUserToDB function from the usersServices module to create the user in the database
    const result = await userService.createUserToDB(user);

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
export const UserController = {
  createUser,
};
