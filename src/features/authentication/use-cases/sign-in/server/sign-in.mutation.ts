'use server';

import { signIn } from '@authentication/sign-in';
import { Schema } from 'effect';
import { redirect } from 'next/navigation';
import { handleServerActionError, type ServerActionResult } from '@/libraries/server-action';
import { publicProcedure, withActions } from '@/libraries/trpc';
import { signInValidation } from '../sign-in.validation';

export const signInMutation = publicProcedure
  .input(Schema.decodeUnknownSync(signInValidation))
  .use(withActions({ signIn }))
  .mutation(async ({ input: { username, password, redirect: intended }, ctx: { signIn } }): Promise<ServerActionResult> => {
    try {
      await signIn(username, password);
      redirect(intended ?? '/dashboard');
    } catch (error: unknown) {
      return handleServerActionError(error, {
        INVALID_EMAIL_OR_PASSWORD: 'Identifiant ou mot de passe invalide'
      });
    }
  });
