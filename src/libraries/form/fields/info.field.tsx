import type { ReactNode } from 'react';
import { useFieldContext } from '../form-context';
import { hasError } from './has-error';

const hasExactlyOne = <T,>(items: T[]): items is [T] => items.length === 1;

export const Info = ({
  errors: errorsProp = [],
  className = 'text-error mt-1 text-xs'
}: {
  errors?: Error[];
  className?: string;
}): ReactNode => {
  const { state } = useFieldContext<string>();
  const errors: Error[] = [...state.meta.errors, ...errorsProp];

  return hasError(state) || errorsProp.length > 0 ? (
    hasExactlyOne(errors) ? (
      <p className={className}>{errors[0].message}</p>
    ) : (
      <ul className={className}>
        {errors.map(({ message }) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    )
  ) : null;
};
