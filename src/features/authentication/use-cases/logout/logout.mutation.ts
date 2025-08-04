'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/libraries/better-auth';
import type { ServerActionResult } from '@/libraries/server-action';
import { publicProcedure } from '@/libraries/trpc';

export const logoutMutation = publicProcedure.mutation(async ({ ctx: { headers } }): Promise<ServerActionResult> => {
  await auth.api.signOut({ headers });

  redirect('/login');
});
