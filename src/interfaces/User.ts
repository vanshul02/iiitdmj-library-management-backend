import { StaffAttributes } from "./Staff";
import { StudentAttributes } from "./Student";

export interface UserAttributes {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  student?: StudentAttributes;
  staff?: StaffAttributes;
  email: string;
  hashedPassword: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  STUDENT = 'student',
  STAFF = 'staff'
}