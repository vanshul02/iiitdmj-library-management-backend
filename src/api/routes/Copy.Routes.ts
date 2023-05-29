import { Router } from "express";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
import * as controller from "../controllers/Copy.Controller";
import * as util from "../controllers/utils/Util";
const router = Router();

router.use(deserializeUser, requireUser);

router.post('/add', util.checkForStaff, controller.addCopy);
router.post('/issue/:id', util.checkForStaff);
router.post('/return/:id', util.checkForStaff);
router.get('/:id');
router.put('/update/:id', util.checkForStaff);
router.delete('/delete/:id', util.checkForStaff);
export default router;