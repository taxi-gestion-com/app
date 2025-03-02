import { Schema } from 'effect';
import { publicProcedure } from '@/trpc/server/procedures';
import { registerValidation } from './register.validation';

const procedures = {
  register: publicProcedure
    .input(Schema.decodeUnknownSync(registerValidation))
    .mutation(async ({ input: { username, password } }): Promise<void> => {
      console.log('Register new user with credentials:', username, password);
    })
};

export default procedures;
