import { minLength, NullishOr, pattern, String as Str, Struct } from 'effect/Schema';

export const loginValidation = Struct({
  username: Str.pipe(minLength(1, { message: () => 'Saisissez votre adresse électronique' })),
  password: Str.pipe(minLength(1, { message: () => 'Saisissez le mot de passe de votre compte' })),
  redirect: NullishOr(Str.pipe(pattern(/^\/[^/].*/, { message: () => 'La page de destination doit commencer par un /' })))
});

export type LoginValidation = typeof loginValidation.Type;
