import { Schema } from 'effect';

export const registerValidation = Schema.Struct({
  username: Schema.Trim.pipe(
    Schema.minLength(1, {
      message: () => 'Saisissez votre adresse électronique ou numéro de téléphone portable'
    }),
    Schema.filter(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^(?:0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(value) ||
        `"${value}" n'est pas une adresse électronique ou un numéro de téléphone valide`
    )
  ),
  password: Schema.String.pipe(
    Schema.minLength(1, {
      message: () => 'Saisissez le mot de passe de votre compte'
    }),
    Schema.minLength(8, {
      message: () => 'Le mot de passe doit contenir 8 caractères au minimum'
    }),
    Schema.pattern(/[{}()\[\]<>.:;!?=*+\-_'"/@#%&]/, {
      message: () => 'Le mot de passe doit contenir au moins un caractère spécial : []{}()<>.:;!?=*+-_\'"/@#%&'
    }),
    Schema.pattern(/\d/, {
      message: () => 'Le mot de passe doit contenir au moins un chiffre'
    }),
    Schema.pattern(/[A-Z]/, {
      message: () => 'Le mot de passe doit contenir au moins une lettre en majuscule'
    }),
    Schema.pattern(/[a-z]/, {
      message: () => 'Le mot de passe doit contenir au moins une lettre en minuscule'
    }),
    Schema.filter((password) => !password.startsWith(' ') || 'Le mot de passe ne doit pas commencer avec un espace'),
    Schema.filter((password) => !password.endsWith(' ') || 'Le mot de passe ne doit pas se terminer avec un espace')
  ),
  terms: Schema.Boolean.pipe(Schema.filter((isAccepted) => isAccepted || 'Vous devez accepter les conditions d’utilisation'))
});

export type RegisterValidation = typeof registerValidation.Type;
