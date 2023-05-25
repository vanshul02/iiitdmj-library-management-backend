import { Router } from "express";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
import * as controller from '../controllers/Book.Controller';
const router = Router();

router.use(deserializeUser, requireUser);

router.post('/add', controller.addBook);
router.get('/:id', controller.getBookById);
router.put('/update', controller.updateBook);
router.delete('/delete', controller.deleteBook);

export default router;