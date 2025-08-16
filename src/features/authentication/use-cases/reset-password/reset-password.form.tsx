'use client';

import type { ReactNode } from 'react';
import { RiEyeLine, RiEyeOffLine, RiLockLine } from 'react-icons/ri';
import { applyEffectSchema, handleAction, handleSubmit, useAppForm } from '@/libraries/form';
import { inject } from '@/libraries/piqure';
import { useServerAction } from '@/libraries/server-action';
import { toastError } from '@/libraries/server-action/components';
import { Button } from '@/libraries/ui/primitives/button';
import { Link } from '@/libraries/ui/primitives/link';
import { ToggleState } from '@/libraries/ui/primitives/toggle-state';
import type { LoosePartial } from '@/libraries/utils';
import { RESET_PASSWORD_KEY } from './reset-password.key';
import { type ResetPasswordValidation, resetPasswordValidation } from './reset-password.validation';

type ResetPasswordFormProps = LoosePartial<Pick<ResetPasswordValidation, 'email' | 'token'>>;

export const ResetPasswordForm = ({ token = '', email }: ResetPasswordFormProps): ReactNode => {
  const [action, isPending, state] = useServerAction(inject(RESET_PASSWORD_KEY), {
    onError: toastError
  });

  const form = useAppForm({
    defaultValues: {
      token,
      email,
      password: '',
      confirmPassword: ''
    },
    validators: {
      onChange: applyEffectSchema(resetPasswordValidation)
    },
    onSubmit: handleAction(action)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        <form.AppField name='token'>{(field) => <field.Input isPending={isPending} hidden />}</form.AppField>
        <form.AppField name='email'>{(field) => <field.Input isPending={isPending} hidden />}</form.AppField>
        <form.AppField name='password'>
          {(field) => (
            <field.Group>
              <field.Label>Nouveau mot de passe</field.Label>
              <ToggleState>
                {(isActive: boolean, toggleActive: () => void) => (
                  <field.Input
                    type={isActive ? 'text' : 'password'}
                    isPending={isPending}
                    scale='input-lg'
                    left={<RiLockLine className='opacity-40' />}
                    right={
                      <Button type='button' className='px-1' kind='btn-link' onClick={toggleActive}>
                        {isActive ? <RiEyeOffLine size='20' /> : <RiEyeLine size='20' />}
                      </Button>
                    }
                  />
                )}
              </ToggleState>
              <p className='text-muted mt-3 text-xs'>Doit contenir minuscule, majuscule, chiffre et caractère spécial</p>
              <field.Info />
            </field.Group>
          )}
        </form.AppField>
        <form.AppField name='confirmPassword'>
          {(field) => (
            <field.Group>
              <field.Label>Confirmation du nouveau de passe</field.Label>
              <ToggleState>
                {(isActive: boolean, toggleActive: () => void) => (
                  <field.Input
                    type={isActive ? 'text' : 'password'}
                    isPending={isPending}
                    scale='input-lg'
                    left={<RiLockLine className='opacity-40' />}
                    right={
                      <Button type='button' className='px-1' kind='btn-link' onClick={toggleActive}>
                        {isActive ? <RiEyeOffLine size='20' /> : <RiEyeLine size='20' />}
                      </Button>
                    }
                  />
                )}
              </ToggleState>
              <field.Info />
            </field.Group>
          )}
        </form.AppField>
        <form.Submit isPending={isPending} scale='btn-lg' modifier='btn-block' className='mt-12'>
          Réinitialiser mon mot de passe
        </form.Submit>
      </form>
      {state?.success === false && (
        <>
          <p className='mt-12 mb-4 text-center'>
            Un problème avec le lien de réinitialisation de mot de passe&nbsp;?
            <br />
          </p>
          <p className='text-center'>
            Recommencez la <Link href='/forgot-password'>réinitialisation de votre mot de passe</Link> pour en obtenir un
            nouveau&nbsp;!
          </p>
        </>
      )}
    </form.AppForm>
  );
};
