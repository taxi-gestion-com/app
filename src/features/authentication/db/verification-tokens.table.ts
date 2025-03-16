import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

export const VERIFICATION_TOKEN_TABLE = 'verificationToken';

export const verificationTokensTable = pgTable(
  VERIFICATION_TOKEN_TABLE,
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token]
    })
  ]
);
