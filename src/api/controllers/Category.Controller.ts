import { Request, Response } from "express";
import { AppDataSource } from "../../db/DataSource";
import { Category } from "../../db/entity/Category";
import * as util from "./utils/Util";

const categoryRepository = AppDataSource.getRepository(Category);

export const addCategory = async (req: Request, res: Response) => {
  if (util.checkForStaff(res.locals.user)) {
    console.log("Inserting a new category into the database...");
    const { name } = req.body;
    const category = new Category(name);
    try {
      const result = await categoryRepository.save(category);
      console.log("Saved a new user with id: " + category.id);
      console.log("Result: " + result);
      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  } else {
    return res.status(401).json("You are not authorized to perform this action");
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
