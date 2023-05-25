import { Router } from "express";
import { deserializeUser } from "../../middleware/DeserializeUser";
import { requireUser } from "../../middleware/RequireUser";
const router = Router();

router.use(deserializeUser, requireUser);

export default router;