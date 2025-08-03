import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { env } from '@/env';

export default defineConfig({
  out: './src/libraries/drizzle/migrations',
  schema: './src/**/db/*.table.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: { url: env.DATABASE_URL }
});
