import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import HTTPStatus from 'http-status';
import User, { IUser } from './user.model';
import { HTTP400Error } from '@utils/http-errors';

export const validation = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z!@#$%^&*])([a-zA-Z!@#?$%^&*0-9]+)$/)
        .required(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
    },
  },
};

export class UserController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      const stores = await User.find();
      return res.status(HTTPStatus.OK).json(stores);
    } catch (e) {
      next(new HTTP400Error(e.toString()));
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.create(req.body);
      const userToken = user.toAuthJSON();
      return res.status(HTTPStatus.CREATED).json(userToken);
    } catch (e) {
      next(new HTTP400Error(e.toString()));
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const _user = req.user as IUser;
      const id = req.params.id || _user._id;
      const user = await User.findById(id);
      return res.status(HTTPStatus.OK).json(user);
    } catch (e) {
      next(new HTTP400Error(e.toString()));
    }
  }
}
