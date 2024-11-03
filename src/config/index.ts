import 'dotenv/config';

export default {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ?? 3000,
  MYURL: process.env.MYURL ?? '',
  ORIGINS: ['http://localhost:4200'],
  JWT: {
    SEED: process.env.JWT_SEED ? process.env.JWT_SEED : 'SEED',
    TOKEN_DUR: process.env.JWT_TOKEN_DUR ? process.env.JWT_TOKEN_DUR : '24h',
  },
};
