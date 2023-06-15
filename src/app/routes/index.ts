import express from "express";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

// more advance way for avoiding repeating code
const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

// General Way of using route

// router.use("/users/", UserRoutes);
// router.use("/academic-semesters/", AcademicSemesterRoutes);

export default router;
