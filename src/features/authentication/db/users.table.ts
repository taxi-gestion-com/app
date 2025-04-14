import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const USER_TABLE = 'user';

export const usersTable = pgTable(USER_TABLE, {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text(),
  email: text().unique(),
  hashedPassword: text(),
  emailVerified: timestamp({ mode: 'date' }),
  image: text()
});
