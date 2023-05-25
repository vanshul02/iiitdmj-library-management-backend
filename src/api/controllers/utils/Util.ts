import { User } from "../../../db/entity/User";
import { Role } from "../../../interfaces/User";

export const checkForStaff = (user: User) => {
  if (user.role !== Role.STAFF)
    return false;
  return true;
}