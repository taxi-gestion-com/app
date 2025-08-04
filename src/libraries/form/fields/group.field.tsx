import type { ReactNode } from 'react';
import { cn } from '@/libraries/utils';

export const Group = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn('mb-4', className)}>{children}</div>
);
