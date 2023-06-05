import { Student } from "../db/entity/Student";
import { BookAttributes } from "./Book";
import { IssueHistoryAttributes } from "./IssueHistory";

export interface CopyAttributes {
  id: number;
  book: BookAttributes;
  isIssued: boolean;
  issuedAt?: Date;
  issuedBy?: Student;
  issueHistory?: IssueHistoryAttributes[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCopyAttributes {
  bookId: number;
}