import { minLength, String as Str, Struct } from 'effect/Schema';

export const forgotPasswordValidation = Struct({
  username: Str.pipe(minLength(1, { message: () => 'Saisissez votre adresse électronique' }))
});

export type ForgotPasswordValidation = typeof forgotPasswordValidation.Type;
