import { Button } from '@react-email/components';
import type { ReactNode } from 'react';

export const EmailButton = ({ href, children }: { href: string; children: ReactNode }) => (
  <Button className='bg-primary rounded px-6 py-3 text-center font-semibold text-white' href={href}>
    {children}
  </Button>
);
