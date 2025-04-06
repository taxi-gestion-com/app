import { useActionState } from 'react';

export const useAction = <
  TFormData extends Parameters<TAction>[0],
  TAction extends (formData: Parameters<TAction>[0]) => Promise<void>
>(
  action: TAction
): [(formData: FormData | TFormData) => void | Promise<void>, boolean] => {
  const [, dispatch, isPending] = useActionState(
    action as unknown as (state: void | null, payload: unknown) => void | Promise<void>,
    null
  );
  return [dispatch, isPending];
};
