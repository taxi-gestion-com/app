import { ReactNode } from 'react';
import { useFieldContext } from '../form-context';

export const Info = (): ReactNode => {
  const { state } = useFieldContext<string>();

  return state.meta.isTouched && state.meta.errors.length ? (
    state.meta.errors.length === 1 ? (
      <p className='validator-hint text-error'>{state.meta.errors[0].message}</p>
    ) : (
      <ul className='validator-hint text-error'>
        {state.meta.errors.map(({ message }) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    )
  ) : null;
};
