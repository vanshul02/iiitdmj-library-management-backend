import * as express from 'express';
import * as controller from '../controllers/User.Controller';
import { deserializeUser } from '../../middleware/DeserializeUser';
import { requireUser } from '../../middleware/RequireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', controller.getMeHandler);

export default router;