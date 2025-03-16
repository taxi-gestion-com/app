'use server';

import { Schema } from 'effect';
import { publicProcedure } from '@/lib/trpc';
import { registerValidation } from './register.validation';

export const registerMutation = publicProcedure
  .input(Schema.decodeUnknownSync(registerValidation))
  .mutation(async ({ input: { username, password } }): Promise<void> => {
    console.log('Register new user with credentials:', username, password);
  });
