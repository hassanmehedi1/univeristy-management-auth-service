import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./users.interface";
import { User } from "./users.model";
import { generateUserId } from "./users.utils";

/**
 * Creates a user in the database.
 * @param user - The user object to be created.
 * @returns The created user object or null.
 */
const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  // Generate a unique ID for the user
  const id = await generateUserId();
  user.id = id;

  // Set a default password if it is not provided
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  // Create the user in the database
  const createdUser = await User.create(user);

  // Check if user creation was successful
  if (!createUserToDB) {
    throw new ApiError(400, `Failed to create user!`);
  }

  return createdUser;
};

// Export the function as a module
export default {
  createUserToDB,
};
