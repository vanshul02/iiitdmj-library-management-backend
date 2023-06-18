import { Copy } from "../db/entity/Copy";
import { User } from "../db/entity/User";
import { BookAttributes } from "./Book";
import { IssueHistoryAttributes } from "./IssueHistory";

export interface CopyAttributes {
  id: number;
  book: BookAttributes;
  isIssued: boolean;
  issuedAt?: Date;
  issuedBy?: User;
  issueHistory?: IssueHistoryAttributes[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCopyAttributes {
  bookId: number;
}

export interface UpdateCopyAttributes {
  copy: Copy;
  isIssued: boolean;
  issuedAt?: Date;
  issuedBy?: User;
  dueDate?: Date;
}

export interface IssueCopyAttributes {
  userId: number;
  copyId: number;
  issuedDate: Date;
  dueDate: Date;
}

export interface ReturnCopyAttributes {
  copyId: number;
  returnDate: Date;
  finePostingDate: Date;
  fineAmount: number;
}