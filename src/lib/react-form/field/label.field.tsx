import { ReactNode } from 'react';
import { useFieldContext } from '../form-context';

export const Label = ({ children, className = 'mb-1 block' }: { children: ReactNode; className?: string }) => {
  const { name } = useFieldContext<string>();

  return (
    <label htmlFor={name} className={className}>
      {children}
    </label>
  );
};
