import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './users.table';

export const SESSION_TABLE = 'session';

export const sessionsTable = pgTable(SESSION_TABLE, {
  sessionToken: text().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  expires: timestamp({ mode: 'date' }).notNull()
});
