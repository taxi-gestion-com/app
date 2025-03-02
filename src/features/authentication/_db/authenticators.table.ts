import { boolean, integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { usersTable } from './users.table';

const AUTHENTICATOR_TABLE = 'authenticator';

export const authenticatorsTable = pgTable(
  AUTHENTICATOR_TABLE,
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports')
  },
  (authenticator) => [
    primaryKey({
      columns: [authenticator.userId, authenticator.credentialID]
    })
  ]
);
