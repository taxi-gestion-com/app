'use server';

import { Schema } from 'effect';
import { redirect } from 'next/navigation';
import { auth } from '@/libraries/better-auth';
import type { ServerActionResult } from '@/libraries/server-action';
import { publicProcedure } from '@/libraries/trpc';
import { loginValidation } from './login.validation';

export const loginMutation = publicProcedure
  .input(Schema.decodeUnknownSync(loginValidation))
  .mutation(async ({ input: { username, password, redirect: intended }, ctx: { headers } }): Promise<ServerActionResult> => {
    await auth.api.signInEmail({
      body: {
        email: username,
        password
      },
      headers
    });

    redirect(intended ?? '/dashboard');
  });
