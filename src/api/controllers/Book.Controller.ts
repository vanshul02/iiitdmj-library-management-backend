import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from "../../db/DataSource";
import { Book } from "../../db/entity/Book";
import { CreateBookInputAttributes } from '../../interfaces/Book';
import { Category } from '../../db/entity/Category';

const bookRepository = AppDataSource.getRepository(Book);

const assignCategoryToBook = (book: Book, categoryId: number) => {
  let tempCategory = new Category("");
  tempCategory.id = categoryId;
  book.category = tempCategory;
};

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createBookInput: CreateBookInputAttributes = req.body;
  let book = new Book(createBookInput.name, createBookInput.summary, createBookInput.author);
  assignCategoryToBook(book, createBookInput.categoryId);
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