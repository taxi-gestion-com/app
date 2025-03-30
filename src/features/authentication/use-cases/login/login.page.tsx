import { ReactNode } from 'react';
import { LoginForm } from './login.form';

export const LoginPage = async ({ username }: { username: string }): Promise<ReactNode> => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Connexion</h1>
    <p className='text-base-content/60 mb-12'>
      Ravis de vous revoir 👋
      <br />
      Vous pourrez continuer là où vous en étiez après vous être connecté.
    </p>
    <LoginForm username={username} />
  </>
);
