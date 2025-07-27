'use server';

import { Schema } from 'effect';
import { redirect } from 'next/navigation';
import { auth } from '@/libraries/better-auth';
import { publicProcedure } from '@/libraries/trpc';
import { loginValidation } from './login.validation';

export const loginMutation = publicProcedure
  .input(Schema.decodeUnknownSync(loginValidation))
  .mutation(async ({ input: { username, password, redirect: intended }, ctx: { headers } }): Promise<void> => {
    await auth.api.signInEmail({
      body: {
        email: username,
        password
      },
      headers
    });

    redirect(intended ?? '/dashboard');
  });
