import { ReactNode } from 'react';
import { Link } from '@/lib/ui/elements/link';
import { City, Logo } from '../illustrations';

export const HomePage = (): ReactNode => (
  <main className='h-screen'>
    <City className='flex h-full items-center justify-center'>
      <div className='relative p-12 text-center'>
        <Logo className='m-auto brightness-0 invert' />
        <p className='text-primary-foreground mt-12 mb-18 text-3xl font-light md:text-4xl xl:text-6xl'>
          Connectez-vous pour accéder au service{' '}
        </p>
        <Link
          variant='none'
          className='border-primary-foreground hover:bg-primary-foreground hover:text-primary text-primary-foreground rounded-md border-2 px-4 py-3 text-xl font-semibold hover:no-underline'
          href='/login'>
          Se connecter
        </Link>
      </div>
    </City>
  </main>
);
