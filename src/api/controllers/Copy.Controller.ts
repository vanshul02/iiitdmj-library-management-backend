import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../db/DataSource";
import { Copy } from "../../db/entity/Copy";
import { CreateCopyAttributes, IssueCopyAttributes } from "../../interfaces/Copy";
import { Book } from "../../db/entity/Book";
import * as bookUtil from "./utils/BookUtils";
import * as copyUtil from './utils/CopyUtils';
import * as studentUtil from "./utils/StudentUtils";
import { IssueHistory } from "../../db/entity/IssueHistory";

const copyReposity = AppDataSource.getRepository(Copy);
const issueHistoryRepository = AppDataSource.getRepository(IssueHistory);

const assignBookToCopy = (copy: Copy, bookId: number) => {
  const book = new Book();
  book.id = bookId;
  copy.book = book;
};

export const addCopy = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Inserting a new copy into the database...");
  const createCopyInput: CreateCopyAttributes = req.body;
  console.log('addCopy createCopyInput: ', createCopyInput);
  let copy = new Copy();
  assignBookToCopy(copy, createCopyInput.bookId);
  try {
    const result = await copyReposity.save(copy);
    console.log("Created new copy with id: " + copy.id);
    console.log("Result: ", result);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const issueCopy = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Issuing a copy...");
  const issueCopyInput: IssueCopyAttributes = req.body;
  console.log('issueCopy issueCopyInput: ', issueCopyInput);
  const issueHistory = await createDataForIssueHistory(issueCopyInput);
  console.log("issueCopy DATABASE INPUT: ", issueHistory);
  try {
    const result = await issueHistoryRepository.save(issueHistory);
    console.log("Created new issue history with id: " + issueHistory.id);
    console.log("issueCopy Result: ", result);
    return res.status(201).json(result);
  } catch (error) {
    console.error("issueCopy ERR: ", error);
    return res.status(400).json(error);
  }
};

const createDataForIssueHistory = async (issueCopyInput: IssueCopyAttributes) => {
  const copy = await copyUtil.getCopyByIdUtility(issueCopyInput.copyId);
  const student = await studentUtil.getStudentByIdUtility(issueCopyInput.studentId);
  if (!copy) 
    throw new Error("Not able to find a copy for id " + issueCopyInput.copyId);
  if (!student) 
    throw new Error("Not able to find a student for id " + issueCopyInput.studentId);
  console.log("Fetched book: " + copy.book.name + " Student: " + student.rollNumber);
  let issueHistory = new IssueHistory();
  issueHistory.book = copy.book;
  issueHistory.copy = copy;
  issueHistory.student = student;
  issueHistory.issuedDate = issueCopyInput.issuedDate;
  issueHistory.dueDate = issueCopyInput.dueDate;
  return issueHistory;
};