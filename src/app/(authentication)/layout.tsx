'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { LayoutTransition } from '@/libraries/ui/animations';
import { City, Logo } from '@/features/brand';

const Layout = ({
  children
}: Readonly<{
  children: ReactNode;
}>): ReactNode => {
  const pathname = useSelectedLayoutSegment();
  const isLoginRoute = pathname === 'login';

  return (
    <div className='flex h-screen'>
      <main className='flex flex-6 flex-col gap-12 overflow-auto px-6 py-13 lg:px-16 xl:flex-5 2xl:flex-1'>
        <Link href='/' title="Retour à l'accueil">
          <Logo className='w-4/5 sm:w-3/5 xl:w-80' />
        </Link>
        <div className='my-auto'>
          <LayoutTransition
            initial={{ opacity: 0, x: isLoginRoute ? '-50%' : '50%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLoginRoute ? '-50%' : '50%' }}
            transition={{ duration: 0.15 }}>
            {children}
          </LayoutTransition>
        </div>
      </main>
      <City className='md:show hidden flex-6 md:flex xl:flex-7 2xl:flex-3'>
        <Logo className='m-auto w-3/4 brightness-0 invert' />
      </City>
    </div>
  );
};

export default Layout;
