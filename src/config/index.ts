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
  SUPABASE: {
    URL_BUCKET: `${process.env.SUPABASE_URL_PROJECT}/storage/v1/object/public/photos/`,
    URL: process.env.SUPABASE_URL_PROJECT
      ? process.env.SUPABASE_URL_PROJECT
      : '',
    KEY: process.env.SUPABASE_ANON_KEY ? process.env.SUPABASE_ANON_KEY : '',
  },
  FILE: {
    MAX_SIZE: 2 * 1024 * 1024, //MB
    IMAGE: {
      MIN_WIDTH: 300,
      MIN_HEIGHT: 300,
    },
  },
};
