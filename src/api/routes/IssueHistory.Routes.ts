import { Router } from "express";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
import * as controller from "../controllers/IssueHistory.Controller";
import * as util from "../controllers/utils/Util";
const router = Router();

router.use(deserializeUser, requireUser);

router.get('/log/day', util.checkForStaff, controller.getDailyLogsForIssue);

export default router;