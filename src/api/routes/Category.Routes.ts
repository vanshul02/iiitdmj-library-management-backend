import { Router } from "express";
import * as controller from "../controllers/Category.Controller";
import * as util from "../controllers/utils/Util";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
const router = Router();

router.use(deserializeUser, requireUser);

router.post('/add', util.checkForStaff, controller.addCategory);
router.get('/list', controller.listCategories);
router.get('/books/:categoryId', controller.listBooks);

export default router;