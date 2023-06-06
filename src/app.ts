import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import usersRouter from "./app/modules/users/users.route";
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/users/", usersRouter);

// Testing
/*

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  // res.send("Hello World!");
  // throw new ApiError(400, "OREE MAMA ERROR KHAISI"); 
  // next("Oree mama error khaisi"); // Error tracer
});

*/

// global error handler
app.use(globalErrorHandler);

export default app;
