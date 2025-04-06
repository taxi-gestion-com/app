import { Schema } from 'effect';

export const forgotPasswordValidation = Schema.Struct({
  username: Schema.String.pipe(
    Schema.minLength(1, { message: () => 'Saisissez votre adresse électronique ou numéro de téléphone portable' })
  )
});
