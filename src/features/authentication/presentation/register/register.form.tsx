'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/lib/ui/elements/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/elements/form';
import { Input } from '@/lib/ui/elements/input';
import { Link } from '@/lib/ui/elements/link';
import { Checkbox } from '@/lib/ui/elements/checkbox';

const registerValidation = z.object({
  username: z
    .string()
    .min(1, { message: 'Saisissez votre adresse électronique ou numéro de téléphone portable' })
    .transform((value) => value.replace(/\s+/g, ''))
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^(?:0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(value),
      (value) => ({ message: `"${value}" n'est pas une adresse électronique ou un numéro de téléphone valide` })
    ),
  password: z
    .string()
    .min(1, { message: 'Saisissez le mot de passe de votre compte' })
    .min(8, { message: 'Le mot de passe doit contenir 8 caractères au minimum' })
    .regex(/[{}()\[\]<>.:;!?=*+\-_'"/@#%&]/, {
      message: 'Le mot de passe doit contenir au moins un caractère spécial : []{}()<>.:;!?=*+-_\'"/@#%&'
    })
    .regex(/\d/, { message: 'Le mot de passe doit contenir au moins un chiffre' })
    .regex(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une lettre en majuscule' })
    .regex(/[a-z]/, { message: 'Le mot de passe doit contenir au moins une lettre en minuscule' })
    .refine((password) => !password.startsWith(' '), { message: 'Le mot de passe ne doit pas commencer avec un espace' })
    .refine((password) => !password.endsWith(' '), { message: 'Le mot de passe ne doit pas se terminer avec un espace' }),
  terms: z.boolean().refine((isAccepted) => isAccepted, { message: 'Vous devez accepter les conditions d’utilisation' })
});

export const RegisterForm = ({ username }: { username: string }) => {
  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username,
      password: '',
      terms: false
    }
  });

  const usernameWatch = form.watch('username');

  const onSubmit = (values: z.infer<typeof registerValidation>) => {
    console.log(values);
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
              <FormControl>
                <Input className='p-6 text-lg' type='text' {...field} />
              </FormControl>
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
              <FormControl>
                <Input className='p-6 text-lg' type='password' {...field} />
              </FormControl>
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
        <Link href={{ pathname: '/login', query: usernameWatch.length > 0 ? { username: usernameWatch } : {} }}>
          Connectez-vous
        </Link>
      </p>
    </Form>
  );
};
