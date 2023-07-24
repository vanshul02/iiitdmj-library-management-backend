import { CopyAttributes } from "./Copy";
import { IssueHistoryAttributes } from "./IssueHistory";

export interface StudentAttributes {
  id: number;
  user: any;
  rollNumber: string;
  issueHistory?: IssueHistoryAttributes[];
  issuedCopies?: CopyAttributes[];
}