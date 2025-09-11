'use server';

import { Schema } from 'effect';
import { redirect } from 'next/navigation';
import { auth } from '@/libraries/better-auth';
import { handleServerActionError, type ServerActionResult } from '@/libraries/server-action';
import { publicProcedure } from '@/libraries/trpc';
import { activateValidation } from './activate.validation';

export const activateMutation = publicProcedure
  .input(Schema.decodeUnknownSync(activateValidation))
  .mutation(async ({ input: { token } }): Promise<ServerActionResult> => {
    try {
      await auth.api.verifyEmail({ query: { token } });
      redirect('/dashboard');
    } catch (error: unknown) {
      return handleServerActionError(error, {
        TOKEN_EXPIRED: 'Le lien d’activation a expiré. Veuillez en demander un nouveau.',
        INVALID_TOKEN: 'Le lien d’activation est invalide. Veuillez en demander un nouveau'
      });
    }
  });
