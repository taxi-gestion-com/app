'use client';

import { useMutation } from '@tanstack/react-query';
import { effectTsResolver } from '@hookform/resolvers/effect-ts';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Link } from '@/lib/ui/elements/link';
import { Checkbox } from '@/lib/ui/elements/checkbox';
import { useTRPC } from '@/trpc/client';
import { EmailField, PasswordField } from '../_presentation';
import { RegisterValidation, registerValidation } from './register.validation';

export const RegisterForm = ({ username }: { username: string }) => {
  const trpc = useTRPC();
  const register = useMutation(trpc.register.mutationOptions());

  const form = useForm<RegisterValidation>({
    resolver: effectTsResolver(registerValidation),
    defaultValues: {
      username,
      password: '',
      terms: false
    }
  });

  const usernameValue = form.watch('username');

  const onSubmit = (values: RegisterValidation) => {
    register.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
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
          name='password'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Mot de passe</FormLabel>
              <PasswordField field={field} />
              <FormDescription>Doit contenir minuscule, majuscule, chiffre et caractère spécial</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='terms'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <div className='flex items-center space-x-2'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>
                  J’accepte les <Link href='/terms'>conditions d’utilisation</Link>
                </FormLabel>
              </div>
              <FormMessage className='block' />
            </FormItem>
          )}
        />
        <Button className='mt-12 w-full p-6 text-lg' type='submit'>
          Créer mon compte
        </Button>
      </form>
      <p className='mt-12 text-center'>
        Vous avez déjà un compte&nbsp;?&ensp;
        <Link
          href={{
            pathname: '/login',
            query: usernameValue.length > 0 ? { username: usernameValue } : {}
          }}>
          Connectez-vous
        </Link>
      </p>
    </Form>
  );
};
