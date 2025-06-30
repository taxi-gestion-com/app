import { Struct, String, Number, Array, minItems } from 'effect/Schema';

const Address = Struct({
  id: String,
  label: String,
  city: String,
  citycode: String,
  postcode: String,
  street: String,
  x: Number,
  y: Number
});

export const userInformationsValidation = Struct({
  address: Address.annotations({ parseIssueTitle: () => 'Cherchez une adresse, puis sélectionnez parmi celles proposées' }),
  addresses: Array(Address).pipe(minItems(1, { message: () => 'Veuillez sélectionner au moins une adresse' }))
});

export type UserInformationsValidation = typeof userInformationsValidation.Type;
