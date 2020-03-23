import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
// import Redis from 'ioredis';
import constants from '@config/constants';

// const client = new Redis(constants.REDIS_PORT, constants.REDIS_HOST);

const limiter = rateLimit({
  /**
   * 기본설정인 memory store 를 사용합니다.
   * 만약, Redis Store 를 사용하려면 아래의 구문을 주석해제 합니다.
   */
  // store: new RedisStore({
  //   client,
  // }),
  windowMs: 1 * 60 * 1000,
  max: 100,
});

export default limiter;
