'use server';

import { db, users } from '@/db';
import { publicProcedure } from '@/lib/trpc';
import { eq } from 'drizzle-orm';
import { Schema } from 'effect';

const validation = Schema.Struct({
  userId: Schema.String
});

export const welcomeUserQuery = publicProcedure
  .input(Schema.decodeUnknownSync(validation))
  .query(async ({ input: { userId } }) => {
    return db.query.users.findFirst({
      columns: { name: true },
      where: eq(users.id, userId)
    });
  });
