import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const VERIFICATION_TABLE = 'verification';

export const verificationsTable = pgTable(VERIFICATION_TABLE, {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
});
