'use client';

import { RiEyeLine, RiEyeOffLine, RiLockLine, RiMailLine } from 'react-icons/ri';
import { applyEffectSchema, handleAction, handleSubmit, useAction, useAppForm } from '@/libraries/react-form';
import { Button } from '@/libraries/ui/primitives/button';
import { ToggleState } from '@/libraries/ui/primitives/toggle-state';
import { Link } from '@/libraries/ui/primitives/link';
import { inject } from '@/libraries/piqure';
import { REGISTER_KEY } from './register.key';
import { registerValidation } from './register.validation';

export const RegisterForm = ({ username }: { username: string }) => {
  const [action, isPending] = useAction(inject(REGISTER_KEY));

  const form = useAppForm({
    defaultValues: {
      username,
      password: '',
      terms: false
    },
    validators: {
      onChange: applyEffectSchema(registerValidation)
    },
    onSubmit: handleAction(action)
  });

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit(form)}>
        <form.AppField name='username'>
          {(field) => (
            <field.Item>
              <field.Label>Adresse électronique ou numéro de téléphone portable</field.Label>
              <field.Input isPending={isPending} scale='input-lg' left={<RiMailLine className='opacity-40' />} />
              <field.Info />
            </field.Item>
          )}
        </form.AppField>
        <form.AppField name='password'>
          {(field) => (
            <field.Item>
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
              <p className='text-muted mt-3 text-xs'>Doit contenir minuscule, majuscule, chiffre et caractère spécial</p>
              <field.Info />
            </field.Item>
          )}
        </form.AppField>
        <form.AppField name='terms'>
          {(field) => (
            <field.Item>
              <field.Checkbox isPending={isPending}>
                J’accepte les
                <Link href='/terms' target='_blank'>
                  conditions d’utilisation
                </Link>
              </field.Checkbox>
              <field.Info />
            </field.Item>
          )}
        </form.AppField>
        <form.Submit isPending={isPending} scale='btn-lg' modifier='btn-block' className='mt-12'>
          Créer mon compte{' '}
        </form.Submit>
      </form>
      <p className='mt-12 text-center'>
        Vous avez déjà un compte&nbsp;?&ensp;
        <form.QueryLink pathname='/login' queryParam='username'>
          Connectez-vous
        </form.QueryLink>
      </p>
    </form.AppForm>
  );
};
