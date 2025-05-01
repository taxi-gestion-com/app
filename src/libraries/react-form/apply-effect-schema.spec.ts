import { Schema } from 'effect';
import { describe, it, expect } from 'vitest';
import { applyEffectSchema } from './apply-effect-schema';

const loginValidation = Schema.Struct({
  username: Schema.String.pipe(
    Schema.minLength(1, { message: () => 'Saisissez votre adresse électronique ou numéro de téléphone portable' })
  ),
  password: Schema.String.pipe(Schema.minLength(1, { message: () => 'Saisissez le mot de passe de votre compte' }))
});

describe('effect validator', (): void => {
  it('should map effect validation errors to standard error', () => {
    const errors = applyEffectSchema(loginValidation)({ value: { username: '', password: '' } });

    expect(errors).toEqual({
      fields: {
        username: {
          message: 'Saisissez votre adresse électronique ou numéro de téléphone portable',
          type: 'Refinement'
        },
        password: {
          message: 'Saisissez le mot de passe de votre compte',
          type: 'Refinement'
        }
      }
    });
  });
});
