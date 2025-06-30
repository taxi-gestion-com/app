'use client';

import { ReactNode } from 'react';
import { applyEffectSchema, handleAction, handleSubmit, useAction, useAppForm } from '@/libraries/form';
import { inject } from '@/libraries/piqure';
import { Options } from '@/libraries/ui/primitives/options';
import { Button } from '@/libraries/ui/primitives/button';
import {
  addressCombobox,
  addressOptions,
  addressSelectedItems,
  DEFAULT_ADDRESS,
  DEFAULT_ADDRESSES
} from '@/features/address/address-combobox';
import { userInformationsValidation } from './user-informations.validation';
import { USER_INFORMATIONS_KEY } from './user-informations.key';
import { Loading } from '@/libraries/ui/primitives/loading';

const addressPlaceholder = (field: { state: { value: unknown[] } }): string => {
  if (field.state.value.length === 0) return 'Sélectionnez vos adresses';
  if (field.state.value.length === 1) return '1 adresse sélectionnée';
  return `${field.state.value.length} adresses sélectionnées`;
};

export const UserInformationForm = () => {
  const [action, isPending] = useAction(inject(USER_INFORMATIONS_KEY));

  const form = useAppForm({
    validators: {
      onChange: applyEffectSchema(userInformationsValidation)
    },
    defaultValues: {
      address: DEFAULT_ADDRESS,
      addresses: DEFAULT_ADDRESSES
    },
    onSubmit: handleAction(action)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        <form.AppField name='address'>
          {(field) => (
            <field.Group>
              <field.Combobox isPending={isPending} {...addressCombobox(field.state.value)}>
                {({ getLabelProps, getInputProps, payload: { isLoading }, ...options }): ReactNode => (
                  <>
                    <field.Label {...getLabelProps()}>Une adresse</field.Label>
                    <field.Input
                      {...getInputProps()}
                      placeholder='Sélectionnez votre adresse'
                      right={<Loading scale='loading-xs' isLoading={isLoading} />}
                    />
                    <Options {...options} {...addressOptions} showEmpty>
                      {options.items.length === 0 && <span className='px-3 py-2'>Aucun résultat trouvée</span>}
                    </Options>
                    <field.Info />
                  </>
                )}
              </field.Combobox>
            </field.Group>
          )}
        </form.AppField>
        <form.AppField name='addresses'>
          {(field) => (
            <field.Group>
              <field.Combobox isPending={isPending} {...addressCombobox(field.state.value)}>
                {({ getLabelProps, getInputProps, ...options }): ReactNode => (
                  <>
                    <field.Label {...getLabelProps()}>Plusieurs adresses</field.Label>
                    <field.Input {...getInputProps()} placeholder={addressPlaceholder(field)} />
                    <Options {...options} {...addressOptions} />
                  </>
                )}
              </field.Combobox>
              <field.Info />
              <div className='flex justify-between'>
                <field.SelectedItems {...addressSelectedItems} />
                {field.state.value.length > 0 && (
                  <Button
                    className='mt-0.5 ml-auto'
                    type='button'
                    kind='btn-link'
                    scale='btn-sm'
                    onClick={() => field.setValue(DEFAULT_ADDRESSES)}>
                    Tout effacer
                  </Button>
                )}
              </div>
            </field.Group>
          )}
        </form.AppField>
        <form.Submit isPending={isPending}>Valider mes adresses</form.Submit>
      </form>
    </form.AppForm>
  );
};
