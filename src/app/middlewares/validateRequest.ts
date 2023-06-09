import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// Controller function for creating a user
const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (err) {
      // Send an error response if there was an error creating the user
      next(err); // went to global error handler
    }
  };

// Export the createUser function as the default export
export default validateRequest;
