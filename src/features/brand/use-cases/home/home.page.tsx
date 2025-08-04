import type { ReactNode } from 'react';
import { ButtonLink } from '@/libraries/ui/primitives/button-link';
import { CityIllustration, Logo } from '../illustrations';

export const HomePage = ({ isLoggedIn }: { isLoggedIn: boolean }): ReactNode => (
  <main className='h-screen'>
    <CityIllustration className='flex h-full items-center justify-center'>
      <div className='relative bg-transparent p-12 text-center' data-theme='dark'>
        <Logo className='m-auto brightness-0 invert' />
        <p className='mt-12 mb-18 text-3xl font-light md:text-4xl xl:text-6xl'>Connectez-vous pour accéder au service</p>
        {isLoggedIn ? (
          <ButtonLink
            href='/dashboard'
            scale='btn-lg'
            kind='btn-outline'
            className='hover:bg-base-content hover:text-neutral hover:border-base-content shadow-base-content hover:shadow'
          >
            Accéder au tableau de bord
          </ButtonLink>
        ) : (
          <ButtonLink
            href='/login'
            scale='btn-lg'
            kind='btn-outline'
            className='hover:bg-base-content hover:text-neutral hover:border-base-content shadow-base-content hover:shadow'
          >
            Se connecter
          </ButtonLink>
        )}
      </div>
    </CityIllustration>
  </main>
);
