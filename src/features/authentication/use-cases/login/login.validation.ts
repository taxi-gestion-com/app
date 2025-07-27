import { minLength, Struct, String, NullishOr, pattern } from 'effect/Schema';

export const loginValidation = Struct({
  username: String.pipe(
    minLength(1, { message: () => 'Saisissez votre adresse électronique ou numéro de téléphone portable' })
  ),
  password: String.pipe(minLength(1, { message: () => 'Saisissez le mot de passe de votre compte' })),
  redirect: NullishOr(String.pipe(pattern(/^\/[^\/].*/, { message: () => 'La page de destination doit commencer par un /' })))
});

export type LoginValidation = typeof loginValidation.Type;
