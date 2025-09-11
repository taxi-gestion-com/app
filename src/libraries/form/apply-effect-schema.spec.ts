import { minLength, String as Str, Struct } from 'effect/Schema';
import { describe, expect, it } from 'vitest';
import { applyEffectSchema } from './apply-effect-schema';

const DEFAULT_ADDRESS = {
  banId: '',
  city: '',
  citycode: '',
  housenumber: '',
  postcode: '',
  street: '',
  x: 0,
  y: 0
};

const userValidation = Struct({
  firstname: Str.pipe(minLength(1, { message: () => 'Please enter your first name' })),
  lastname: Str.pipe(minLength(1, { message: () => 'Please enter your last name' })),
  address: Struct({
    banId: Str.pipe(minLength(1, { message: () => 'Please select an address from the suggestions' })),
    city: Str,
    citycode: Str,
    housenumber: Str,
    postcode: Str,
    street: Str
  })
});

describe('effect validator', (): void => {
  it('should map effect validation errors to standard error', () => {
    const errors = applyEffectSchema(userValidation)({ value: { firstname: '', lastname: '', address: DEFAULT_ADDRESS } });

    expect(errors).toEqual({
      fields: {
        firstname: [
          {
            message: 'Please enter your first name',
            type: 'Refinement'
          }
        ],
        lastname: [
          {
            message: 'Please enter your last name',
            type: 'Refinement'
          }
        ],
        address: [
          {
            message: 'Please select an address from the suggestions',
            type: 'Refinement'
          }
        ],
        'address.banId': [
          {
            message: 'Please select an address from the suggestions',
            type: 'Refinement'
          }
        ]
      }
    });
  });
});
