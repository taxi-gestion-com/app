import { Schema } from 'effect';
import { filter, minLength, NumberFromString, String as Str, Struct } from 'effect/Schema';

export const envSchema = Struct({
  NEXT_PUBLIC_APP_NAME: Str.pipe(minLength(1, { message: () => 'App name must not be empty' })),
  NEXT_PUBLIC_COPYRIGHT: Str.pipe(minLength(1, { message: () => 'Copyright must not be empty' })),

  DB_USER: Str.pipe(minLength(1, { message: () => 'DB_USER must not be empty' })),
  DB_PASSWORD: Str.pipe(minLength(32, { message: () => 'DB_PASSWORD must be at least 32 characters long' })),
  DB_HOST: Str.pipe(minLength(1, { message: () => 'DB_HOST must not be empty' })),
  DB_PORT: NumberFromString.pipe(
    filter((n) => (Number.isInteger(n) && n >= 1 && n <= 65535) || 'DB_PORT must be an integer between 1 and 65535')
  ),
  DB_NAME: Str.pipe(minLength(1, { message: () => 'DB_NAME must not be empty' })),

  BETTER_AUTH_SECRET: Str.pipe(minLength(1, { message: () => 'BETTER_AUTH_SECRET must not be empty' })),
  BETTER_AUTH_URL: Str.pipe(minLength(1, { message: () => 'BETTER_AUTH_URL must not be empty' })),

  AUTH_SESSION_TOKEN: Str.pipe(minLength(1, { message: () => 'AUTH_SESSION_TOKEN must not be empty' }))
});

const dEnv = Schema.decodeUnknownSync(envSchema)(process.env);

export const env = {
  ...dEnv,
  DATABASE_URL: `postgres://${dEnv.DB_USER}:${dEnv.DB_PASSWORD}@${dEnv.DB_HOST}:${dEnv.DB_PORT}/${dEnv.DB_NAME}`
};

export type Env = typeof env;
