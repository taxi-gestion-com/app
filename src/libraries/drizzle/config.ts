import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from '@/settings';

export default defineConfig({
  out: './src/libraries/drizzle/migrations',
  schema: './src/features/**/db/*.table.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: { url: DATABASE_URL }
});
