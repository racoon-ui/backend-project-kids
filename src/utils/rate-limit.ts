import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import constants from '@config/constants';

const client = new Redis(constants.REDIS_PORT, constants.REDIS_HOST);

const limiter = rateLimit({
  store: new RedisStore({
    client,
  }),
  windowMs: 1 * 60 * 1000,
  max: 100,
});

export default limiter;
