import { describe, it, expect } from 'vitest';
import { minLength, Struct, String } from 'effect/Schema';
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
  firstname: String.pipe(minLength(1, { message: () => 'Please enter your first name' })),
  lastname: String.pipe(minLength(1, { message: () => 'Please enter your last name' })),
  address: Struct({
    banId: String.pipe(minLength(1, { message: () => 'Please select an address from the suggestions' })),
    city: String,
    citycode: String,
    housenumber: String,
    postcode: String,
    street: String
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
