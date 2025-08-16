import { filter, minLength, NullishOr, pattern, String as Str, Struct } from 'effect/Schema';

export const resetPasswordValidation = Struct({
  token: Str.pipe(minLength(1)),
  email: NullishOr(Str),
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
  confirmPassword: Str.pipe(
    minLength(1, {
      message: () => 'Confirmez le mot de passe de votre compte'
    })
  )
}).pipe(
  filter(({ password, confirmPassword }) => {
    if (password === confirmPassword) return true;
    return {
      path: ['confirmPassword'],
      message: 'La confirmation du mot de passe ne correspond pas au nouveau mot de passe'
    };
  })
);

export type ResetPasswordValidation = typeof resetPasswordValidation.Type;
