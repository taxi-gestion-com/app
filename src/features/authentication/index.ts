import forgotPasswordProcedures from './forgot-password/forgot-password.procedures';
import loginProcedures from './login/login.procedures';
import registerProcedures from './register/register.procedures';

export * from './activate';
export * from './forgot-password';
export * from './login';
export * from './register';
export * from './reset-password';

export const authenticationProcedures = {
  ...forgotPasswordProcedures,
  ...loginProcedures,
  ...registerProcedures
};
