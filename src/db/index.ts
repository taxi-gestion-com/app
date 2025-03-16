import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_URL } from '@/settings';
import * as schema from './schema';

export const db = drizzle(DATABASE_URL, { schema });

export * from './schema';
