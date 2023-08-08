import { Router } from "express";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
import * as controller from "../controllers/Copy.Controller";
import * as util from "../controllers/utils/Util";
const router = Router();

router.use(deserializeUser, requireUser);

router.post('/add', util.checkForStaff, controller.addCopy);
router.post('/issue/:id', util.checkForStaff, controller.issueCopy);
router.post('/return/:id', util.checkForStaff);
router.get('/:id', controller.getById);
router.delete('/delete/:id', util.checkForStaff);
export default router;