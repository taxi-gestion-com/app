import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const Loading = ({
  isLoading = false,
  className,
  children
}: {
  isLoading: boolean;
  className?: string;
  children: ReactNode;
}) => (
  <span className='flex h-full items-center justify-center'>
    {isLoading ? <span className={cn('loading', className)} aria-hidden={true} /> : children}
  </span>
);
