import type { LoosePartial } from '@/libraries/utils';
import { RegisterForm } from './register.form';
import type { RegisterValidation } from './register.validation';

type RegisterPageProps = LoosePartial<Pick<RegisterValidation, 'username'>>;

export const RegisterPage = async ({ username }: RegisterPageProps) => (
  <>
    <h1 className='text-primary mb-6 text-4xl font-semibold'>Créez votre compte</h1>
    <p className='text-muted mb-12'>
      Bienvenue chez Taxi Gestion 👋 <br />
      Vous pourrez commencer à utiliser l’application après avoir créé votre compte.
    </p>
    <RegisterForm username={username} />
  </>
);
