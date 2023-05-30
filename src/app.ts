import express, { Application, Request, Response, urlencoded } from "express";
const app: Application = express();
import cors from "cors";
const port = 5000;

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
