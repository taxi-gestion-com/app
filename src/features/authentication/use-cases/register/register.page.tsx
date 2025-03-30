import { RegisterForm } from './register.form';

export const RegisterPage = async ({ username }: { username: string }) => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Créez votre compte</h1>
    <p className='text-base-content/60 mb-12'>
      Bienvenue chez Taxi Gestion 👋 <br />
      Vous pourrez commencer à utiliser l’application après avoir créé votre compte.
    </p>
    <RegisterForm username={username} />
  </>
);
