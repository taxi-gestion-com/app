import { Schema } from 'effect';
import { publicProcedure } from '@/trpc/server/procedures';
import { loginValidation } from './login.validation';

const procedures = {
  login: publicProcedure
    .input(Schema.decodeUnknownSync(loginValidation))
    .mutation(async ({ input: { username, password } }): Promise<void> => {
      console.log('Log user in with credentials:', username, password);
    })
};

export default procedures;
