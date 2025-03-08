'use client';

import { useMutation } from '@tanstack/react-query';
import { effectTsResolver } from '@hookform/resolvers/effect-ts';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Link } from '@/lib/ui/elements/link';
import { Checkbox } from '@/lib/ui/elements/checkbox';
import { Loading } from '@/lib/ui/elements/loading';
import { useTRPC } from '@/trpc/client';
import { EmailField, PasswordField } from '../_presentation';
import { RegisterValidation, registerValidation } from './register.validation';

export const RegisterForm = ({ username }: { username: string }) => {
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(trpc.authentication.register.mutationOptions());

  const form = useForm<RegisterValidation>({
    resolver: effectTsResolver(registerValidation),
    defaultValues: {
      username,
      password: '',
      terms: false
    }
  });

  const usernameValue = useWatch({ name: 'username', control: form.control });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values: RegisterValidation) => mutate(values))}>
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
              <FormDescription>Doit contenir minuscule, majuscule, chiffre et caractère spécial</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='terms'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <div className='flex items-center space-x-2'>
                <FormControl>
                  <Checkbox checked={field.value} disabled={isPending} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>
                  J’accepte les <Link href='/terms'>conditions d’utilisation</Link>
                </FormLabel>
              </div>
              <FormMessage className='block' />
            </FormItem>
          )}
        />
        <Button className='mt-12 w-full p-6 text-lg' type='submit' disabled={isPending}>
          <Loading isLoading={isPending}>Créer mon compte</Loading>
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
