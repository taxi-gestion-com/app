import { boolean, integer, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './users.table';

const AUTHENTICATOR_TABLE = 'authenticator';

export const authenticatorsTable = pgTable(
  AUTHENTICATOR_TABLE,
  {
    credentialID: uuid('credentialID').notNull().unique(),
    userId: uuid('userId')
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
