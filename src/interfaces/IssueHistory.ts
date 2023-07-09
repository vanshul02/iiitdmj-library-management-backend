import { BookAttributes } from "./Book";
import { CopyAttributes } from "./Copy";
import { UserAttributes } from "./User";

export interface IssueHistoryAttributes {
  id : number;
  copy: CopyAttributes;
  book: BookAttributes;
  issuedBy: UserAttributes;
  fineAmount?: number;
  fineClearingDate?: Date;
  finePostingDate?: Date;
  dueDate: Date;
  issuedDate: Date;
  returnDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface getDailyLogsAttributes {
  date: Date;
}