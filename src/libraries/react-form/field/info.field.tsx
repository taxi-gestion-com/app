import { ReactNode } from 'react';
import { hasError } from '@/libraries/react-form/field/has-error';
import { useFieldContext } from '../form-context';

export const Info = ({ className = 'text-error mt-1 text-xs' }: { className?: string }): ReactNode => {
  const { state } = useFieldContext<string>();

  return hasError(state) ? (
    state.meta.errors.length === 1 ? (
      <p className={className}>{state.meta.errors[0].message}</p>
    ) : (
      <ul className={className}>
        {state.meta.errors.map(({ message }) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    )
  ) : null;
};
