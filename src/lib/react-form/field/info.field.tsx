import { ReactNode } from 'react';
import { useFieldContext } from '../form-context';

export const Info = (): ReactNode => {
  const { state } = useFieldContext<string>();

  return (
    <>
      {state.meta.isTouched && state.meta.errors.length ? (
        <em>{state.meta.errors.map(({ message }) => message).join(', ')}</em>
      ) : null}
    </>
  );
};
