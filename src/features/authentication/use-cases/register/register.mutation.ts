'use server';

import { Schema } from 'effect';
import { publicProcedure } from '@/libraries/trpc';
import { auth } from '@/libraries/better-auth';
import { redirect } from 'next/navigation';
import { registerValidation } from './register.validation';

export const registerMutation = publicProcedure
  .input(Schema.decodeUnknownSync(registerValidation))
  .mutation(async ({ input: { username, password } }): Promise<void> => {
    console.log('Register new user with credentials:', username, password);

    await auth.api.signUpEmail({
      body: {
        name: username,
        email: username,
        password
      }
    });

    redirect('/');
  });
