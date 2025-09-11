import type { ReactNode } from 'react';
import type { LoosePartial } from '@/libraries/utils';
import { SignInForm } from './sign-in.form';
import type { SignInValidation } from './sign-in.validation';

type SignInPageProps = LoosePartial<Pick<SignInValidation, 'username' | 'redirect'>>;

export const SignInPage = async ({ username, redirect }: SignInPageProps): Promise<ReactNode> => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Connexion</h1>
    <p className='text-muted mb-12'>
      Ravis de vous revoir 👋
      <br />
      Vous pourrez continuer là où vous en étiez après vous être connecté.
    </p>
    <SignInForm username={username} redirect={redirect} />
  </>
);
