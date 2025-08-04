import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const USER_TABLE = 'user';

export const usersTable = pgTable(USER_TABLE, {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});
