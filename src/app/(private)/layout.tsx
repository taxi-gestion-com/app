import type { ReactNode } from 'react';
import { LogoutButton } from '@/features/authentication/use-cases/logout';
import { LOGOUT_KEY } from '@/features/authentication/use-cases/logout/logout.key';
import { logoutMutation } from '@/features/authentication/use-cases/logout/logout.mutation';
import { Logo } from '@/features/brand';
import { ClientProvider } from '@/libraries/piqure';
import { Link } from '@/libraries/ui/primitives/link';

const PrivateLayout = ({ children }: { children: ReactNode }): ReactNode => (
  <>
    <div className='navbar bg-navbar px-4 shadow-lg'>
      <div className='navbar-start'>
        <Link href='/dashboard' title='Retour au tableau de bord'>
          <Logo className='max-w-50' />
        </Link>
      </div>
      <div className='navbar-end'>
        <ClientProvider bind={LOGOUT_KEY} to={logoutMutation}>
          <LogoutButton scale='btn-sm'>Déconnexion</LogoutButton>
        </ClientProvider>
      </div>
    </div>
    <div className='flex h-screen justify-center px-6 py-12'>
      <div className='w-full max-w-7xl'>{children}</div>
    </div>
  </>
);

export default PrivateLayout;
