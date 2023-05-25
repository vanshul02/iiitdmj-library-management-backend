import { Router } from "express";
import * as controller from "../controllers/Category.Controller";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
const router = Router();

router.use(deserializeUser, requireUser);

router.post('/add', controller.addCategory);
router.get('/list', controller.listCategories);

export default router;