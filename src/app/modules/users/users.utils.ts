/*
let lastMainID = 11111; // Initialize with the last assigned main ID

export const generateProgramID = (semester: number): string => {
  const currentYear = new Date().getFullYear();
  const mainID = (lastMainID++).toString(); // Increment the main ID for each new ID generation
  const programID = `${currentYear
    .toString()
    .substr(-2)}-${mainID}-${semester.toString()}`;
  return programID;
};
*/

import { User } from "./users.model";

// pHero Func

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0");

  // increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  return incrementedId;
};
