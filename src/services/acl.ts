import jwt from 'jsonwebtoken';
import constants from '@config/constants';
import { Request, Response, NextFunction } from 'express';

export const IS_ADMIN: string = 'admin';
export const IS_USER: string = 'user';
export const IS_ANONYMOUS: string = 'anonymous';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ').pop();
    if (!token) {
      return next(new Error('No token Provided'));
    }

    jwt.verify(token, constants.JWT_SECRET, (err, decoded) => {
      if (err) return res.send(err);
      req.user = decoded;
    });
  }
  next();
};
