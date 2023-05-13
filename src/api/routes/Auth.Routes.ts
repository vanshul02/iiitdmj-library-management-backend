import * as express from 'express';
import {
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
} from '../controllers/Auth.Controller';
import { deserializeUser } from '../../middleware/DeserializeUser';
import { requireUser } from '../../middleware/RequireUser';

const router = express.Router();

// Register user
router.post('/register', registerUserHandler);

// Login user
router.post('/login', loginUserHandler);

// Logout user
router.get('/logout', deserializeUser, requireUser, logoutHandler);

// Refresh access token
router.get('/refresh', refreshAccessTokenHandler);

export default router;

