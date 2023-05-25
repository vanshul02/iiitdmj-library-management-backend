import { Request, Response } from "express";
import { AppDataSource } from "../../db/DataSource"
import { Category } from "../../db/entity/Category"

export const addCategory = async (req: Request, res: Response) => {
  console.log("Inserting a new category into the database...")
  const category = new Category()
  category.name = "E-Book"
  try {
    const result = await AppDataSource.manager.save(category)
    console.log("Saved a new user with id: " + category.id)
    console.log("Result: " + result)
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const listCategories = async (req: Request, res: Response) => {
  console.log("Loading categories from the database...")
  try {
    const categories = await AppDataSource.manager.find(Category)
    console.log("Loaded categories: ", categories)
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
