import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../db/DataSource";
import { Category } from "../../db/entity/Category";
import { CreateCategoryInputAttributes } from "../../interfaces/Category";

const categoryRepository = AppDataSource.getRepository(Category);

export const addCategory = async (req: Request, res: Response) => {
  console.log("Inserting a new category into the database...");
  const createCategoryInput: CreateCategoryInputAttributes = req.body;
  const category = new Category(createCategoryInput.name);
  //TODO: ADD name validation
  try {
    const result = await categoryRepository.save(category);
    console.log("Saved a new user with id: " + category.id);
    console.log("Result: " + result);
    return res.status(201).json(result);
  } catch (error: any) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: "Category with that name already exists"
      });
    }
    return res.status(400).json(error);
  }
};

export const listCategories = async (req: Request, res: Response) => {
  console.log("Loading categories from the database...");
  try {
    const categories = await categoryRepository.find();
    console.log("Loaded categories: ", categories);
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const listBooks = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params;
  console.log("Fetching Books for catgeoryID: " + categoryId);
  try {
    const category = await categoryRepository.findOne({
      where: {
        id: Number(categoryId)
      },
      relations: {
        books: true
      }
    });
    return res.status(200).json(category?.books);
  } catch (error) {
    return next();
  }
};