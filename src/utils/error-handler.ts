import { Response, NextFunction, Request } from 'express';
import { HTTPClientError } from '@utils/http-errors';

export const clientError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    res
      .status(err.statusCode)
      .json({ status: err.statusCode, success: false, message: err.toString() });
  } else {
    next(err);
  }
};

export const serverError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};
