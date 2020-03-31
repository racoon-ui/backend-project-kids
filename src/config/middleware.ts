import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import passport from 'passport';
import expressWinston from 'express-winston';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import winstonInstance from './winston';
import { corsWhiteList } from './whitelist';
import limiter from '@utils/rate-limit';
import { clientError, serverError } from '@utils/error-handler';

const isTest: boolean = process.env.NODE_ENV === 'test';
const isDev: boolean = process.env.NODE_ENV === 'development';

type MiddlewareDelegate = (app: express.Application) => void;

const middleware: MiddlewareDelegate = (app: express.Application) => {
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(helmet());
  app.use(cors(corsWhiteList));
  app.use(methodOverride());
  app.use(limiter);
  app.use(clientError);
  app.use(serverError);
  if (isDev && !isTest) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorize: true,
      }),
    );
  }
};

export default middleware;
