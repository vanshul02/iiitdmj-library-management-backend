import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from "../../db/DataSource";
import { Book } from "../../db/entity/Book";

const bookRepository = AppDataSource.getRepository(Book);

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, summary, author, category  } = req.body;
  const book = new Book(name, summary, author, category);
  try {
    const result = await bookRepository.save(book);
    console.log("Added a new book with id: " + book.id);
    console.log("Result: " + result);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  try {
    const result = await bookRepository.findOneBy({
      id: id
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const updateBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

};

export const deleteBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

};