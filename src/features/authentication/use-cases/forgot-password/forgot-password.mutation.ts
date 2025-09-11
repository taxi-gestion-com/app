'use server';

import { Schema } from 'effect';
import { redirect } from 'next/navigation';
import { auth } from '@/libraries/better-auth';
import type { ServerActionResult } from '@/libraries/server-action';
import { publicProcedure } from '@/libraries/trpc';
import { forgotPasswordValidation } from './forgot-password.validation';

export const forgotPasswordMutation = publicProcedure
  .input(Schema.decodeUnknownSync(forgotPasswordValidation))
  .mutation(async ({ input: { username } }): Promise<ServerActionResult> => {
    await auth.api.requestPasswordReset({
      body: { email: username }
    });

    redirect(`/reset-password?email=${username}`);
  });
