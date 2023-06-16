import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// pHero Func

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  // eslint-disable-next-line no-undefined
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, "0");

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  if (academicSemester) {
    incrementedId = `${academicSemester.year.substring(2)}${
      academicSemester.code
    }${incrementedId}`;
  } else {
    throw new Error("Academic semester is null");
  }

  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  // eslint-disable-next-line no-undefined
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, "0");

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};
