import { StaffAttributes } from "./Staff";
import { StudentAttributes } from "./Student";

export interface UserAttributes {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  student?: StudentAttributes;
  staff?: StaffAttributes;
  email: string;
  hashed_password: string;
  role: Role;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export enum Role {
  STUDENT = 'student',
  STAFF = 'staff'
}