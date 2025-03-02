'use client';

import { useMutation } from '@tanstack/react-query';
import { effectTsResolver } from '@hookform/resolvers/effect-ts';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Link } from '@/lib/ui/elements/link';
import { Loading } from '@/lib/ui/elements/loading';
import { useTRPC } from '@/trpc/client';
import { EmailField, PasswordField } from '../_presentation';
import { LoginValidation, loginValidation } from './login.validation';

export const LoginForm = ({ username }: { username: string }) => {
  const trpc = useTRPC();
  const login = useMutation(trpc.authentication.login.mutationOptions());

  const form = useForm<LoginValidation>({
    resolver: effectTsResolver(loginValidation),
    defaultValues: {
      username,
      password: ''
    }
  });

  const usernameValue = form.watch('username');

  const onSubmit = (values: LoginValidation) => {
    login.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          disabled={login.isPending}
          name='username'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Adresse électronique ou numéro de téléphone portable</FormLabel>
              <EmailField field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={login.isPending}
          name='password'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Mot de passe</FormLabel>
              <PasswordField field={field} />
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
        <Button className='mt-12 w-full p-6 text-lg' type='submit' disabled={login.isPending}>
          <Loading isLoading={login.isPending}>Se connecter</Loading>
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
