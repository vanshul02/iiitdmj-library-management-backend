import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../db/DataSource";
import { Copy } from "../../db/entity/Copy";
import { CreateCopyAttributes, IssueCopyAttributes, ReturnCopyAttributes, UpdateCopyAttributes } from "../../interfaces/Copy";
import { Book } from "../../db/entity/Book";
import * as bookUtil from "./utils/BookUtils";
import * as copyUtil from './utils/CopyUtils';
import * as userUtil from './utils/UserUtils';
import * as studentUtil from "./utils/StudentUtils";
import { IssueHistory } from "../../db/entity/IssueHistory";

const copyReposity = AppDataSource.getRepository(Copy);
const issueHistoryRepository = AppDataSource.getRepository(IssueHistory);
const queryRunner = AppDataSource.createQueryRunner();

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
    console.log("addCopy Result: ", result);
    return res.status(201).json(result);
  } catch (error) {
    console.error("addCopy ERR: ", error);
    return res.status(400).json(error);
  }
};

const getUpdatedCopy = (updateCopyInput: UpdateCopyAttributes) => {
  console.log("updateCopy Updating a copy...");
  let copy = updateCopyInput.copy;
  copy.isIssued = updateCopyInput.isIssued;
  copy.issuedAt = updateCopyInput.issuedAt;
  copy.issuedBy = updateCopyInput.issuedBy;
  copy.dueDate = updateCopyInput.dueDate;
  return copy;
};

export const issueCopy = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Issuing a copy...");
  await queryRunner.connect()
  const copyId = Number(req.params.id);
  const issueCopyInput: IssueCopyAttributes = req.body;
  await queryRunner.startTransaction()
  try {
    if (copyId !== issueCopyInput.copyId)
      throw new Error("Copy ID Mismatch in input and params");
    console.log('issueCopy issueCopyInput: ', issueCopyInput);
    const issueHistory = await createDataForIssueHistory(issueCopyInput);
    console.log("issueCopy DATABASE INPUT: ", issueHistory);
    const updateCopyResult = await queryRunner.manager.save(issueHistory.copy);
    const result = await queryRunner.manager.save(issueHistory);
    await queryRunner.commitTransaction()
    await queryRunner.release()
    console.log("Created new issue history with id: " + issueHistory.id);
    console.log("issueCopy UpdateCopyResult: ", updateCopyResult);
    console.log("issueCopy Result: ", result);
    return res.status(201).json(result);
  } catch (error: any) {
    await queryRunner.rollbackTransaction()
    console.error("issueCopy ERR: ", error);
    return res.status(400).json(error.message);
  }
};

export const returnCopy = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Returning a copy...");
  const copyId = Number(req.params.id);
  const returnCopyInput: ReturnCopyAttributes = req.body;
};

const createDataForIssueHistory = async (issueCopyInput: IssueCopyAttributes) => {
  const copy = await copyUtil.getCopyByIdUtility(issueCopyInput.copyId);
  if (!copy) 
    throw new Error("Not able to find a copy for id " + issueCopyInput.copyId);
  if (copy.isIssued)
    throw new Error("Copy is already issued");
  const user = await userUtil.getUserById(issueCopyInput.userId);
  if (!user) 
    throw new Error("Not able to find a student for id " + issueCopyInput.userId);
  console.log("Fetched book: " + copy.book.name + " Student: " + user.firstName);
  let issueHistory = new IssueHistory();
  const updateCopyInput: UpdateCopyAttributes = {
    copy: copy,
    isIssued: true,
    issuedAt: issueCopyInput.issuedDate,
    issuedBy: user,
    dueDate: issueCopyInput.dueDate
  };
  const updatedCopy = getUpdatedCopy(updateCopyInput);
  issueHistory.book = copy.book;
  issueHistory.copy = updatedCopy;
  issueHistory.issuedBy = user;
  issueHistory.issuedDate = new Date(issueCopyInput.issuedDate);
  issueHistory.dueDate = new Date(issueCopyInput.dueDate);
  return issueHistory;
};