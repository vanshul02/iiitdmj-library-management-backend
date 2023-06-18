import { BookAttributes } from "./Book";
import { CopyAttributes } from "./Copy";
import { StudentAttributes } from "./Student";

export interface IssueHistoryAttributes {
  id : number;
  copy: CopyAttributes;
  book: BookAttributes;
  student: StudentAttributes;
  fineAmount?: number;
  fineClearingDate?: Date;
  finePostingDate?: Date;
  dueDate: Date;
  issuedDate: Date;
  returnDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}