import HTTPStatus from 'http-status';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { IUser } from './user.model';

export const validation = {
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,42}$/)
        .required(),
    },
  },
};

export class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    const user = req.user as IUser;
    res.status(HTTPStatus.OK).json(user.toAuthJSON());
  }
}
