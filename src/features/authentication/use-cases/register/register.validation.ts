import { Boolean as Bool, filter, minLength, pattern, String as Str, Struct, Trim } from 'effect/Schema';

export const registerValidation = Struct({
  username: Trim.pipe(
    minLength(1, { message: () => 'Saisissez votre adresse électronique' }),
    filter(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^(?:0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(value) ||
        `"${value}" n'est pas une adresse électronique ou un numéro de téléphone valide`
    )
  ),
  password: Str.pipe(
    minLength(1, {
      message: () => 'Saisissez le mot de passe de votre compte'
    }),
    minLength(8, { message: () => 'Le mot de passe doit contenir 8 caractères au minimum' }),
    pattern(/[{}()[\]<>.:;!?=*+\-_'"/@#%&]/, {
      message: () => 'Le mot de passe doit contenir au moins un caractère spécial : []{}()<>.:;!?=*+-_\'"/@#%&'
    }),
    pattern(/\d/, { message: () => 'Le mot de passe doit contenir au moins un chiffre' }),
    pattern(/[A-Z]/, { message: () => 'Le mot de passe doit contenir au moins une lettre en majuscule' }),
    pattern(/[a-z]/, { message: () => 'Le mot de passe doit contenir au moins une lettre en minuscule' }),
    filter((password) => !password.startsWith(' ') || 'Le mot de passe ne doit pas commencer avec un espace'),
    filter((password) => !password.endsWith(' ') || 'Le mot de passe ne doit pas se terminer avec un espace')
  ),
  terms: Bool.pipe(filter((isAccepted) => isAccepted || 'Vous devez accepter les conditions d’utilisation'))
});

export type RegisterValidation = typeof registerValidation.Type;
