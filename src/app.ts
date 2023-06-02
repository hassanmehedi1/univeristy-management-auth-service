import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import usersRouter from "./app/modules/users/users.route";

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/users/", usersRouter);

// Testing
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
