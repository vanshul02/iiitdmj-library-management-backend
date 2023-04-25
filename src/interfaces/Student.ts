import { CopyAttributes } from "./Copy";
import { IssueHistoryAttributes } from "./IssueHistory";

export interface StudentAttributes {
  id: number;
  user: any;
  roll_number: string;
  issue_history?: IssueHistoryAttributes[];
  issued_copies?: CopyAttributes[];
}