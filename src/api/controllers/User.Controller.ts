import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../db/DataSource';
import { User } from '../../db/entity/User';

const userRepository = AppDataSource.getRepository(User);

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.id);
    console.log("Invoked getUserById for id: ", userId);
    const result = await userRepository.findOne({
      where: {
        id: userId
      },
      relations: ['issueHistory', 'issueHistory.book', 'issueHistory.copy']
    });
    console.log("getUserById RES: ", result);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error("getUserById ERR: ", err);
    return res.status(400).json(err);
  }
};