'use client';

import type { ReactNode } from 'react';
import { applyEffectSchema, handleAction, handleSubmit, useAppForm } from '@/libraries/form';
import { inject } from '@/libraries/piqure';
import { useServerAction } from '@/libraries/server-action';
import { toastError } from '@/libraries/server-action/components';
import { Link } from '@/libraries/ui/primitives/link';
import type { LoosePartial } from '@/libraries/utils';
import { ACTIVATE_KEY } from './activate.key';
import { type ActivateValidation, activateValidation } from './activate.validation';

type ActivateFormProps = LoosePartial<ActivateValidation>;

export const ActivateForm = ({ token = '' }: ActivateFormProps): ReactNode => {
  const [action, isPending, state] = useServerAction(inject(ACTIVATE_KEY), {
    onError: toastError
  });

  const form = useAppForm({
    defaultValues: {
      token
    },
    validators: {
      onChange: applyEffectSchema(activateValidation)
    },
    onSubmit: handleAction(action)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        <form.AppField name='token'>{(field) => <field.Input isPending={isPending} hidden />}</form.AppField>
        <form.Submit isPending={isPending} scale='btn-lg' modifier='btn-block'>
          Activer mon compte
        </form.Submit>
      </form>
      {state?.success === false && (
        <>
          <p className='mt-12 mb-4 text-center'>
            Un problème avec le lien d’activation&nbsp;?
            <br />
          </p>
          <p className='text-center'>
            Recommencez la <Link href='/register'>création de votre compte</Link> pour en obtenir un nouveau&nbsp;!
          </p>
        </>
      )}
    </form.AppForm>
  );
};
