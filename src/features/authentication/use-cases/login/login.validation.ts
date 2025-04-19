import { minLength, Struct, String } from 'effect/Schema';

export const loginValidation = Struct({
  username: String.pipe(
    minLength(1, { message: () => 'Saisissez votre adresse électronique ou numéro de téléphone portable' })
  ),
  password: String.pipe(minLength(1, { message: () => 'Saisissez le mot de passe de votre compte' }))
});
