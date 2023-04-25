import { Student } from "../db/entity/Student";
import { BookAttributes } from "./Book";
import { IssueHistoryAttributes } from "./IssueHistory";

export interface CopyAttributes {
  id: number;
  book: BookAttributes;
  is_issued: boolean;
  issued_at?: Date;
  issued_by?: Student;
  issue_history?: IssueHistoryAttributes[];
  due_date?: Date;
  created_at: Date;
  updated_at: Date;
}