import { BookAttributes } from "./Book";
import { CopyAttributes } from "./Copy";
import { StudentAttributes } from "./Student";

export interface IssueHistoryAttributes {
  id : number;
  copy: CopyAttributes;
  book: BookAttributes;
  student: StudentAttributes;
  fine_amount?: number;
  fine_clearing_date?: Date;
  fine_posting_dt?: Date;
  issued_date: Date;
  return_date?: Date;
  created_at: Date;
  updated_at: Date;
}