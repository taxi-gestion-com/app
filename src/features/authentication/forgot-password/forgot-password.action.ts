'use server';

import { Schema } from 'effect';
import { publicProcedure } from '@/lib/trpc';
import { forgotPasswordValidation } from './forgot-password.validation';

export const forgotPasswordAction = publicProcedure
  .input(Schema.decodeUnknownSync(forgotPasswordValidation))
  .mutation(async ({ input: { username } }): Promise<void> => {
    console.log('Send forgot password code to:', username);
  });
