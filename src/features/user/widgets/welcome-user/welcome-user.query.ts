'use server';

import { eq } from 'drizzle-orm';
import { Schema } from 'effect';
import { db } from '@/db';
import { usersTable } from '@/features/authentication';
import { publicProcedure } from '@/lib/trpc';

const validation = Schema.Struct({
  userId: Schema.String
});

export const welcomeUserQuery = publicProcedure
  .input(Schema.decodeUnknownSync(validation))
  .query(async ({ input: { userId } }) => {
    return db.query.users.findFirst({
      columns: { name: true },
      where: eq(usersTable.id, userId)
    });
  });
