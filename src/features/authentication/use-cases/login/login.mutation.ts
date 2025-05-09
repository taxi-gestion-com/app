'use server';

import { Schema } from 'effect';
import { publicProcedure } from '@/libraries/trpc';
import { loginValidation } from './login.validation';

export const loginMutation = publicProcedure
  .input(Schema.decodeUnknownSync(loginValidation))
  .mutation(async ({ input: { username, password }, ctx: { headers } }): Promise<void> => {
    console.log('Log user in with credentials:', username, password);
    console.log('User agent:', headers.get('user-agent'));
  });
