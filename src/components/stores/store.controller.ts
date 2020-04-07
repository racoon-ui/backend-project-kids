import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import HTTPStatus from 'http-status';
import Store, { IStore } from './store.model';
import { HTTP400Error } from '@utils/http-errors';

export const validation = {
  create: {
    body: {
      name: Joi.string().email().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      hour: Joi.string().required(),
      facilities: Joi.array(),
      location: Joi.object().keys({
        type: Joi.string().required(),
        coordinates: Joi.array().required(),
      }),
    },
  },
};

export class StoreController {
  public async index(req: Request, res: Response, next: NextFunction) {
    const { name } = req.query;

    try {
      const stores = await Store.find(name && { name: { $regex: `${name}.*` } });
      return res.status(HTTPStatus.OK).json(stores);
    } catch (e) {
      next(new HTTP400Error(e.toString()));
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await Store.findById(req.params.id);
      return res.status(HTTPStatus.OK).json(store);
    } catch (e) {
      next(new HTTP400Error(e.toString()));
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await Store.create(req.body);
      return res.status(HTTPStatus.CREATED).json(store);
    } catch (e) {
      next(new HTTP400Error(e.toString()));
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(HTTPStatus.OK).json(store);
    } catch (e) {
      next(new HTTP400Error(e.toString()));
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await Store.findByIdAndDelete(req.params.id);
      return res.status(HTTPStatus.OK).json(store);
    } catch (e) {
      next(new HTTP400Error(e.toString()));
    }
  }
}
