import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { UserRoutes } from "./app/modules/users/user.route";
// import ApiError from "./errors/ApiError";
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/users/", UserRoutes);

// Testing

// app.get("/", async (req: Request, res: Response, next: NextFunction) => {
// //   console.log(x);
// });

// global error handler
app.use(globalErrorHandler);

export default app;
