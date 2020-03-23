require('dotenv').config({});

export interface IDefaultConfig {
  PORT: number | undefined;
  SENTRY_DSN: string | undefined;
  PER_PAGE: number | undefined;
}

export interface IEnvConfig {
  JWT_SECRET: string;
  MONGO_URL: string | undefined;
  REDIS_HOST: string | undefined;
  REDIS_PORT: number | undefined;
  REDIS_PASSWORD: string | undefined;
  MAIL_API_KEY: string | undefined;
  FROM_EMAIL: string | undefined;
}

const devConfig: IEnvConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV || '',
  MONGO_URL: process.env.MONGO_URL_DEV,
  REDIS_HOST: process.env.REDIS_HOST_DEV,
  REDIS_PORT: Number(process.env.REDIS_PORT_DEV),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  MAIL_API_KEY: process.env.SENDGRID_API_KEY_DEV,
  FROM_EMAIL: `"${process.env.FROM_EMAIL_NAME_DEV}" <${process.env.FROM_EMAIL_DEV}>`,
};

const testConfig: IEnvConfig = {
  JWT_SECRET: process.env.JWT_SECRET_TEST || '',
  MONGO_URL: process.env.MONGO_URL_TEST,
  REDIS_HOST: process.env.REDIS_HOST_TEST,
  REDIS_PORT: Number(process.env.REDIS_PORT_TEST),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  MAIL_API_KEY: process.env.SENDGRID_API_KEY_DEV,
  FROM_EMAIL: `"${process.env.FROM_EMAIL_NAME_TEST}" <${process.env.FROM_EMAIL_TEST}>`,
};

const prodConfig: IEnvConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD || '',
  MONGO_URL: process.env.MONGO_URL_PROD,
  REDIS_HOST: process.env.REDIS_HOST_PROD,
  REDIS_PORT: Number(process.env.REDIS_PORT_PROD),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD_PROD,
  MAIL_API_KEY: process.env.SENDGRID_API_KEY_PROD,
  FROM_EMAIL: `"${process.env.FROM_EMAIL_NAME_PROD}" <${process.env.FROM_EMAIL_PROD}>`,
};

const defaultConfig: IDefaultConfig = {
  PORT: Number(process.env.PORT) || 3000,
  SENTRY_DSN: process.env.SENTRY_DSN,
  PER_PAGE: Number(process.env.PER_PAGE) || 25,
};

function envConfig(env: string | undefined) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
