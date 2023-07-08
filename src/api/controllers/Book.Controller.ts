import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from "../../db/DataSource";
import { Book } from "../../db/entity/Book";
import { CreateBookInputAttributes, SearchBookAttributes } from '../../interfaces/Book';
import { Category } from '../../db/entity/Category';
import * as bookUtils from './utils/BookUtils';
import { Copy } from '../../db/entity/Copy';
import { Like } from 'typeorm';

const bookRepository = AppDataSource.getRepository(Book);
const copyReposity = AppDataSource.getRepository(Copy);

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
  console.log('addBook createBookInput: ', createBookInput);
  let book = new Book();
  book.name = createBookInput.name;
  book.summary = createBookInput.summary;
  book.author = createBookInput.author;
  assignCategoryToBook(book, createBookInput.categoryId);
  try {
    const result = await bookRepository.save(book);
    console.log("addBook Added a new book with id: " + book.id);
    console.log("addBook Result: ", result);
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
    const result = await bookUtils.getBookByIdUtility(id);
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

export const getAllCopiesForBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = Number(req.params.id);
  console.log("Getiing a list of all copies for book with id: " + bookId);
  try {
    const result = await bookRepository.findOne({
      where: {
        id: bookId
      },
      relations: {
        copies: true
      }
    });
    if(!result || !result.copies)
      return res.status(400).json({
        message : "No copies were found associated with the book"
      });
    console.log("getUnIssuedCopiesForBook Result: ", result.copies);
    return res.status(200).json(result.copies);
  } catch (error) {
    console.error("getUnIssuedCopiesForBook ERR: ", error);
    return res.status(500).json(error);
  }
};


export const getUnIssuedCopiesForBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = Number(req.params.id);
  console.log("Getting a list of all unissued copies for book with id: " + bookId);
  try {
    const result = await copyReposity
    .createQueryBuilder('copy')
    .innerJoinAndSelect('copy.book', 'book')
    .where('book.id = :bookId', { bookId })
    .andWhere('copy.isIssued = false')
    .getMany();
    console.log("getUnIssuedCopiesForBook Result: ", result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("getUnIssuedCopiesForBook ERR: ", error);
    return res.status(400).json(error);
  }
};


export const searchBooksWithCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = Number(req.params.categoryId);
  const searchBookInput: SearchBookAttributes = req.body;
  console.log("Searching in all books with category id: " + categoryId 
    + " with keyword: " + searchBookInput.keyword);
  try {
    const result = await bookRepository.find({
      where: {
        category: {
          id: categoryId
        },
        name: Like(`%${searchBookInput.keyword}%`)
      },
    });
    console.log("searchBooksWithCategory Result: ", result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("searchBooksWithCategory ERR: ", error);
    return res.status(400).json(error);
  }
};