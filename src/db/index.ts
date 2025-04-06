import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_URL } from '@/settings';
import { authenticationSchema } from '@/features/authentication';

export const db = drizzle(DATABASE_URL, {
  schema: {
    ...authenticationSchema
  }
});
