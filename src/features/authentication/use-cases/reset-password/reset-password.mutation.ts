'use server';

import { Schema } from 'effect';
import { redirect } from 'next/navigation';
import { auth } from '@/libraries/better-auth';
import { handleServerActionError, type ServerActionResult } from '@/libraries/server-action';
import { publicProcedure } from '@/libraries/trpc';
import { resetPasswordValidation } from './reset-password.validation';

export const resetPasswordMutation = publicProcedure
  .input(Schema.decodeUnknownSync(resetPasswordValidation))
  .mutation(async ({ input: { token, email, password } }): Promise<ServerActionResult> => {
    try {
      await auth.api.resetPassword({
        body: {
          token,
          newPassword: password
        }
      });

      if (email) {
        await auth.api.signInEmail({
          body: {
            email,
            password
          }
        });

        redirect('/dashboard');
      }

      redirect('/sign-in');
    } catch (error: unknown) {
      return handleServerActionError(error, {
        INVALID_TOKEN: 'Le lien de réinitialisation de mot de passe a expiré. Veuillez en demander un nouveau.'
      });
    }
  });
