import { Router } from "express";
import { addCategory, listCategories } from "../controllers/Category.Controller";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
const router = Router();

router.use(deserializeUser, requireUser);

router.post('/add', addCategory);
router.get('/list', listCategories)

export default router