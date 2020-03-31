import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import HTTPStatus from 'http-status';
import Product, { IProduct } from './product.model';

export const validation = {
  create: {
    body: {
      category: Joi.string().required(),
      name: Joi.string().required(),
      image: Joi.string().required(),
      summary: Joi.string().required(),
      price: Joi.number().required(),
      available: Joi.boolean(),
      description: Joi.string().required(),
    },
  },
};

export class ProductController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      const stores = await Product.find();
      return res.status(HTTPStatus.OK).json(stores);
    } catch (e) {
      e.status = HTTPStatus.BAD_REQUEST;
      return next(e);
    }
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await Product.findById(req.params.id);
      return res.status(HTTPStatus.OK).json(store);
    } catch (e) {
      e.status = HTTPStatus.BAD_REQUEST;
      return next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await Product.create(req.body);
      return res.status(HTTPStatus.CREATED).json(store);
    } catch (e) {
      e.status = HTTPStatus.BAD_REQUEST;
      return next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(HTTPStatus.OK).json(store);
    } catch (e) {
      e.status = HTTPStatus.BAD_REQUEST;
      return next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await Product.findByIdAndDelete(req.params.id);
      return res.status(HTTPStatus.OK).json(store);
    } catch (e) {
      e.status = HTTPStatus.BAD_REQUEST;
      return next(e);
    }
  }
}
