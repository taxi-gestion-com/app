'use server';

import { Schema } from 'effect';
import { publicProcedure } from '@/libraries/trpc';
import { userInformationsValidation } from './user-informations.validation';

export const userInformationsMutation = publicProcedure
  .input(Schema.decodeUnknownSync(userInformationsValidation))
  .mutation(async ({ input: { address, addresses } }): Promise<void> => {
    console.log('Address:', address);
    console.log('Addresses:', addresses);
  });
