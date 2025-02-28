import { Schema } from 'effect';

export const forgotPasswordSchema = Schema.Struct({
  username: Schema.String.pipe(
    Schema.minLength(1, { message: () => 'Saisissez votre adresse électronique ou numéro de téléphone portable' })
  )
});

export type ForgotPasswordSchema = typeof forgotPasswordSchema.Type;
