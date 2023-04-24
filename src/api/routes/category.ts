import { Router } from "express";
import { addCategory, listCategories } from "../controllers/category";
const router = Router();

router.post('/add', addCategory);
router.get('/list', listCategories)

export default router