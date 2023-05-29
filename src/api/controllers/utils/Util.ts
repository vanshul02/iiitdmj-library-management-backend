import { NextFunction, Request, Response } from "express";
import { User } from "../../../db/entity/User";
import { Role } from "../../../interfaces/User";

export const checkForStaff = (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  const user:User = res.locals.user;
  console.log("Checking role for user: " + user.role + " " + user.id);
  if (user.role.toLowerCase() === Role.STAFF) {
    console.log("Authorized");
    return next();
  }
  else {
    console.log("Not Authorized");
    return res.status(401).json({
      message: "You are not authorized to perform this action"
    });
  }
}