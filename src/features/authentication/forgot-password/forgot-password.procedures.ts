import { Schema } from 'effect';
import { publicProcedure } from '@/trpc/server/procedures';
import { forgotPasswordValidation } from './forgot-password.validation';

const procedures = {
  forgotPassword: publicProcedure
    .input(Schema.decodeUnknownSync(forgotPasswordValidation))
    .mutation(async ({ input: { username } }): Promise<void> => {
      console.log('Send forgot password code to:', username);
    })
};

export default procedures;
