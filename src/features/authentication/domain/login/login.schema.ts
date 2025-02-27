import { Schema } from 'effect';

export const loginSchema = Schema.Struct({
  username: Schema.String.pipe(
    Schema.minLength(1, { message: () => 'Saisissez votre adresse électronique ou numéro de téléphone portable' })
  ),
  password: Schema.String.pipe(Schema.minLength(1, { message: () => 'Saisissez le mot de passe de votre compte' }))
});

export type LoginSchema = typeof loginSchema.Type;
