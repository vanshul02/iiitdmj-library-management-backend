import { CategoryAttributes } from "./Category";
import { IssueHistoryAttributes } from "./IssueHistory";

export interface BookAttributes {
  id: number;
  name: string;
  summary?: string;
  author?: string;
  category: CategoryAttributes;
  issueHistory?: IssueHistoryAttributes[];
  copies?: any;
  timesIssued: number;
  numOfCopies: number;
  numOfCopiesIssued: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateBookInputAttributes {
  name: string;
  summary?: string;
  author?: string;
  categoryId: number;
};