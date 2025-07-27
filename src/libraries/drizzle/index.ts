import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_URL } from '@/settings';
import { authenticationSchema } from '@/libraries/better-auth/db';

export const db = drizzle({
  connection: DATABASE_URL,
  schema: { ...authenticationSchema },
  casing: 'snake_case'
});
