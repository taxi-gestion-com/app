import { minLength, Struct, String } from 'effect/Schema';

export const forgotPasswordValidation = Struct({
  username: String.pipe(minLength(1, { message: () => 'Saisissez votre adresse électronique ou numéro de téléphone portable' }))
});

export type ForgotPasswordValidation = typeof forgotPasswordValidation.Type;
