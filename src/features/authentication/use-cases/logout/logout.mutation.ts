'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/libraries/better-auth';
import { publicProcedure } from '@/libraries/trpc';

export const logoutMutation = publicProcedure.mutation(async ({ ctx: { headers } }): Promise<void> => {
  await auth.api.signOut({ headers });

  redirect('/login');
});
