'use server';

import { Schema } from 'effect';
import { publicProcedure } from '@/libraries/trpc';
import { forgotPasswordValidation } from './forgot-password.validation';

export const forgotPasswordMutation = publicProcedure
  .input(Schema.decodeUnknownSync(forgotPasswordValidation))
  .mutation(async ({ input: { username } }): Promise<void> => {
    console.log('Send forgot password code to:', username);
  });
