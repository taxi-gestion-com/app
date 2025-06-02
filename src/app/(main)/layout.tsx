import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className='flex h-screen justify-center p-6'>
    <div className='w-full max-w-5xl'>{children}</div>
  </div>
);

export default MainLayout;
