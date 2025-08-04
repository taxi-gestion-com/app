import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '@/env';
import { authenticationSchema } from '@/libraries/better-auth/db';

export const db = drizzle({
  connection: env.DATABASE_URL,
  schema: { ...authenticationSchema },
  casing: 'snake_case'
});
