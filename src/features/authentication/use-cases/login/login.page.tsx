import type { ReactNode } from 'react';
import type { LoosePartial } from '@/libraries/utils';
import { LoginForm } from './login.form';
import type { LoginValidation } from './login.validation';

type LoginPageProps = LoosePartial<Pick<LoginValidation, 'username' | 'redirect'>>;

export const LoginPage = async ({ username, redirect }: LoginPageProps): Promise<ReactNode> => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Connexion</h1>
    <p className='text-muted mb-12'>
      Ravis de vous revoir 👋
      <br />
      Vous pourrez continuer là où vous en étiez après vous être connecté.
    </p>
    <LoginForm username={username} redirect={redirect} />
  </>
);
