import * as express from 'express';
import * as controller from '../controllers/Auth.Controller';
import { deserializeUser } from '../../middleware/DeserializeUser';
import { requireUser } from '../../middleware/RequireUser';

const router = express.Router();

// Register user
router.post('/register', controller.registerUserHandler);

// Login user
router.post('/login', controller.loginUserHandler);

// Logout user
router.get('/logout', deserializeUser, requireUser, controller.logoutHandler);

// Refresh access token
router.get('/refresh', controller.refreshAccessTokenHandler);

export default router;

