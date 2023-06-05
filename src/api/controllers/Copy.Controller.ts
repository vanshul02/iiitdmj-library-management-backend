import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../db/DataSource";
import { Copy } from "../../db/entity/Copy";
import { CreateCopyAttributes } from "../../interfaces/Copy";
import { Book } from "../../db/entity/Book";

const copyReposity = AppDataSource.getRepository(Copy);

const assignBookToCopy = (copy: Copy, bookId: number) => {
  const book = new Book();
  book.id = bookId;
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