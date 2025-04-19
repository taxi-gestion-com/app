'use server';

import { eq } from 'drizzle-orm';
import { Schema } from 'effect';
import { usersTable } from '@/features/authentication';
import { db } from '@/lib/drizzle';
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
