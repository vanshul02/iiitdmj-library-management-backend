import { CookieOptions, NextFunction, Request, Response } from "express";
import { LoginInputAttributes, UserInputAttributes } from "../../interfaces/User";
import AppError from "../../utils/AppError";
import { User } from "../../db/entity/User";
import { createUser, findUserByEmail, findUserById, signTokens } from "../../services/User.service";
import { signJwt, verifyJwt } from "../../utils/jwt";
import redisClient from "../../utils/ConnectRedis";

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true
};

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + (process.env.ACCESS_TOKEN_EXPIRY as any) * 60 * 1000
  ),
  maxAge: (process.env.ACCESS_TOKEN_EXPIRY as any) * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + (process.env.REFRESH_TOKEN_EXPIRY as any) * 60 * 1000
  ),
  maxAge: (process.env.REFRESH_TOKEN_EXPIRY as any) * 60 * 1000,
};


export const registerUserHandler = async (
  req: Request<{}, {}, UserInputAttributes>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, middleName, lastName, role, password, email } = req.body;

    const user = await createUser({
      firstName, 
      middleName, 
      lastName, 
      role,
      email: email.toLowerCase(),
      password,
    });

    return res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'User with that email already exist',
      });
    }
    return next(err);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginInputAttributes>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, role, password } = req.body;
    const user = await findUserByEmail({ email });

    //1. Check if user exists and password is valid
    if (!user || !(await User.comparePasswords(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    // 2. Sign Access and Refresh Tokens
    const { access_token, refresh_token } = await signTokens(user);

    // 3. Add Cookies
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // 4. Send response
    return res.status(200).json({
      status: 'success',
      access_token,
      refresh_token,
      logged_in: true
    });
  } catch (err: any) {
    next(err);
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    const message = 'Could not refresh access token';

    if (!refresh_token) {
      return next(new AppError(403, message));
    }

    // Validate refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refreshTokenPublicKey'
    );

    if (!decoded) {
      return next(new AppError(403, message));
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(403, message));
    }

    // Check if user still exist
    const user = await findUserById(JSON.parse(session).id);

    if (!user) {
      return next(new AppError(403, message));
    }

    // Sign new access token
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${(process.env.ACCESS_TOKEN_EXPIRY as any)}m`,
    });

    // 4. Add Cookies
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // 5. Send response
    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

const logout = (res: Response) => {
  res.cookie('access_token', '', { maxAge: -1 });
  res.cookie('refresh_token', '', { maxAge: -1 });
  res.cookie('logged_in', '', { maxAge: -1 });
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    await redisClient.del(String(user.id));
    logout(res);
    res.locals.user = null;

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};