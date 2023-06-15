import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
// import ApiError from "./errors/ApiError";
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/", routes);

// Testing

// app.get("/", async (req: Request, res: Response, next: NextFunction) => {
// //   console.log(x);
// });

// global error handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Api route not found",
      },
    ],
  });
  next();
});

export default app;
