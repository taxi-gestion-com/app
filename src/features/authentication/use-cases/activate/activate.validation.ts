import { minLength, String as Str, Struct } from 'effect/Schema';

export const activateValidation = Struct({
  token: Str.pipe(minLength(1))
});

export type ActivateValidation = typeof activateValidation.Type;
