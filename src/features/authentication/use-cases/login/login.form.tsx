'use client';

import { useForm, useWatch } from 'react-hook-form';
import { effectTsResolver } from '@hookform/resolvers/effect-ts';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Link } from '@/lib/ui/elements/link';
import { Loading } from '@/lib/ui/elements/loading';
import { EmailField, PasswordField } from '../../presentation';
import { loginMutation } from './login.mutation';
import { type LoginValidation, loginValidation } from './login.validation';

export const LoginForm = ({ username }: { username: string }) => {
  const { isPending, mutate } = useMutation({ mutationFn: loginMutation });

  const form = useForm<LoginValidation>({
    resolver: effectTsResolver(loginValidation),
    defaultValues: {
      username,
      password: ''
    }
  });

  const usernameValue = useWatch({ name: 'username', control: form.control });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values: LoginValidation) => mutate(values))}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Adresse électronique ou numéro de téléphone portable</FormLabel>
              <EmailField field={{ ...field, disabled: isPending }} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Mot de passe</FormLabel>
              <PasswordField field={{ ...field, disabled: isPending }} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='text-end'>
          <Link
            href={{
              pathname: '/forgot-password',
              query: usernameValue.length > 0 ? { username: usernameValue } : {}
            }}>
            Mot de passe oublié ?
          </Link>
        </div>
        <Button className='mt-12 w-full p-6 text-lg' type='submit' disabled={isPending}>
          <Loading isLoading={isPending}>Se connecter</Loading>
        </Button>
      </form>
      <p className='mt-12 text-center'>
        <Link
          href={{
            pathname: '/register',
            query: usernameValue.length > 0 ? { username: usernameValue } : {}
          }}>
          Créez le dès à présent&nbsp;!
        </Link>
      </p>
    </Form>
  );
};
