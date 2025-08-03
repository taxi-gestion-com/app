'use server';

import { Schema } from 'effect';
import { redirect } from 'next/navigation';
import { auth } from '@/libraries/better-auth';
import { handleServerActionError, isProcessableError, type ServerActionResult } from '@/libraries/server-action';
import { publicProcedure } from '@/libraries/trpc';
import { registerValidation } from './register.validation';

export const registerMutation = publicProcedure
  .input(Schema.decodeUnknownSync(registerValidation))
  .mutation(async ({ input: { username, password } }): Promise<ServerActionResult> => {
    try {
      await auth.api.signUpEmail({
        body: {
          name: username,
          email: username,
          password
        }
      });
      redirect(`/activate?email=${username}`);
    } catch (error: unknown) {
      if (isProcessableError(error) && error.body.code === 'USER_ALREADY_EXISTS') {
        await auth.api.sendVerificationEmail({
          body: {
            email: username
          }
        });
        redirect(`/activate?email=${username}`);
      }

      return handleServerActionError(error);
    }
  });
