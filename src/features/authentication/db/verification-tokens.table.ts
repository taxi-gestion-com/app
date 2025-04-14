import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

export const VERIFICATION_TOKEN_TABLE = 'verification_token';

export const verificationTokensTable = pgTable(
  VERIFICATION_TOKEN_TABLE,
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: timestamp({ mode: 'date' }).notNull()
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token]
    })
  ]
);
