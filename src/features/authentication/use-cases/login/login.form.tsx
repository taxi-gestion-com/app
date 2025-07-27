'use client';

import { RiEyeLine, RiEyeOffLine, RiMailLine, RiLockLine } from 'react-icons/ri';
import { applyEffectSchema, handleAction, handleSubmit, useAction, useAppForm } from '@/libraries/form';
import { Button } from '@/libraries/ui/primitives/button';
import { ToggleState } from '@/libraries/ui/primitives/toggle-state';
import { inject } from '@/libraries/piqure';
import { LOGIN_KEY } from './login.key';
import { LoginValidation, loginValidation } from './login.validation';
import { ReactNode } from 'react';
import { LoosePartial } from '@/libraries/utils';

type LoginFormProps = LoosePartial<Pick<LoginValidation, 'username' | 'redirect'>>;

export const LoginForm = ({ username = '', redirect }: LoginFormProps): ReactNode => {
  const [action, isPending] = useAction(inject(LOGIN_KEY));

  const form = useAppForm({
    defaultValues: {
      username,
      password: '',
      redirect
    },
    validators: {
      onChange: applyEffectSchema(loginValidation)
    },
    onSubmit: handleAction(action)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        <form.AppField name='redirect'>
          {(field) => (
            <field.Group>
              <field.Input isPending={isPending} hidden />
            </field.Group>
          )}
        </form.AppField>
        <form.AppField name='username'>
          {(field) => (
            <field.Group>
              <field.Label>Adresse électronique ou numéro de téléphone portable</field.Label>
              <field.Input isPending={isPending} scale='input-lg' left={<RiMailLine className='opacity-40' />} />
              <field.Info />
            </field.Group>
          )}
        </form.AppField>
        <form.AppField name='password'>
          {(field) => (
            <field.Group>
              <field.Label>Mot de passe</field.Label>
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
        <div className='text-end'>
          <form.QueryLink pathname='/forgot-password' queryParam='username'>
            Mot de passe oublié&nbsp;?
          </form.QueryLink>
        </div>
        <form.Submit isPending={isPending} scale='btn-lg' modifier='btn-block' className='mt-12'>
          Se connecter
        </form.Submit>
      </form>
      <p className='mt-12 text-center'>
        Pas encore de compte ?&ensp;
        <form.QueryLink pathname='/register' queryParam='username'>
          Créez le dès à présent&nbsp;!
        </form.QueryLink>
      </p>
    </form.AppForm>
  );
};
