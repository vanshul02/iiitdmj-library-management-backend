import { Router } from "express";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
import * as controller from '../controllers/Book.Controller';
import * as util from "../controllers/utils/Util";
const router = Router();

router.use(deserializeUser, requireUser);

router.post('/add', util.checkForStaff, controller.addBook);
router.get('/:id', controller.getBookById);
router.get('/:id/copies', controller.getAllCopiesForBook);
router.get('/:id/copies/not-issued', controller.getUnIssuedCopiesForBook);
router.put('/update', util.checkForStaff, controller.updateBook);
router.delete('/delete', util.checkForStaff, controller.deleteBook);

export default router;