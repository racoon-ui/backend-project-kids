import express from 'express';
import { CorsOptions, CorsOptionsDelegate } from 'cors';
require('dotenv').config({});

const env = process.env.NODE_ENV || 'development';
const devWhitelistURLs = env === 'development' ? ['http://localhost:9000'] : [];
const WHITELIST_URL = [...devWhitelistURLs, process.env.WHITELIST_URL];

export const corsWhiteList: CorsOptionsDelegate = (
  req: express.Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
) => {
  const corsOptions: CorsOptions =
    WHITELIST_URL.indexOf(req.header('Origin')) !== -1 ? { origin: true } : { origin: true };

  callback(null, corsOptions);
};
