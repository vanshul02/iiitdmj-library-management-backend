import { CategoryAttributes } from "./Category";
import { IssueHistoryAttributes } from "./IssueHistory";

export interface BookAttributes {
  id: number;
  name: string;
  summary?: string;
  author?: string;
  category: CategoryAttributes;
  issue_history?: IssueHistoryAttributes[];
  copies?: any;
  times_issued: number;
  num_of_copies: number;
  num_of_copies_issued: number;
  created_at: Date;
  updated_at: Date;
}