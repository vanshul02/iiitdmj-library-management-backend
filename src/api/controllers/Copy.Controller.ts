import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../db/DataSource";
import { Copy } from "../../db/entity/Copy";
import { CreateCopyAttributes } from "../../interfaces/Copy";

const copyReposity = AppDataSource.getRepository(Copy);

export const addCopy = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Inserting a new copy into the database...");
  const createCopyInput: CreateCopyAttributes = req.body;
  const copy = new Copy(createCopyInput.book);
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