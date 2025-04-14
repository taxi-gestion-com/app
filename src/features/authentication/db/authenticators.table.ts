import { boolean, integer, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './users.table';

const AUTHENTICATOR_TABLE = 'authenticator';

export const authenticatorsTable = pgTable(
  AUTHENTICATOR_TABLE,
  {
    credentialID: uuid().notNull().unique(),
    userId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    providerAccountId: text().notNull(),
    credentialPublicKey: text().notNull(),
    counter: integer().notNull(),
    credentialDeviceType: text().notNull(),
    credentialBackedUp: boolean().notNull(),
    transports: text()
  },
  (authenticator) => [
    primaryKey({
      columns: [authenticator.userId, authenticator.credentialID]
    })
  ]
);
