import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from '@/settings';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: DATABASE_URL }
});
