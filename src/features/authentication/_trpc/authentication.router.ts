import { router } from '@/trpc/server/root';
import forgotPasswordProcedures from '../forgot-password/forgot-password.procedures';
import loginProcedures from '../login/login.procedures';
import registerProcedures from '../register/register.procedures';

export const authenticationRouter = router({
  ...forgotPasswordProcedures,
  ...loginProcedures,
  ...registerProcedures
});
