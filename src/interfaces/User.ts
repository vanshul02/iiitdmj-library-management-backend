import { StaffAttributes } from "./Staff";
import { StudentAttributes } from "./Student";

export interface UserAttributes {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  student?: StudentAttributes;
  staff?: StaffAttributes;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInputAttributes {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginInputAttributes {
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  STUDENT = 'student',
  STAFF = 'staff'
}