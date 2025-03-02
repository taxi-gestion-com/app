import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const USER_TABLE = 'user';

export const usersTable = pgTable(USER_TABLE, {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  hashedPassword: text('hashedPassword'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image')
});
