'use client';

import { useActionState } from 'react';
import type { ServerActionError, ServerActionResult, ServerActionSuccess } from './server-action-result';

export const useServerAction = <
  TResult,
  TFormData extends Parameters<TAction>[0],
  TAction extends (formData: Parameters<TAction>[0]) => Promise<ServerActionResult<TResult>>
>(
  action: TAction,
  handlers?: {
    onSuccess?: (state: ServerActionSuccess<TResult>) => void;
    onError?: (state: ServerActionError) => void;
  }
): [(formData: TFormData) => void | Promise<void>, boolean, ServerActionResult<TResult> | null] => {
  const [state, dispatch, isPending] = useActionState<ServerActionResult<TResult> | null, TFormData>(
    async (_: ServerActionResult<TResult> | null, formData: TFormData): Promise<ServerActionResult<TResult>> => {
      const result: ServerActionResult<TResult> = await action(formData);
      result.success ? handlers?.onSuccess?.(result) : handlers?.onError?.(result);
      return result;
    },
    null
  );
  return [dispatch, isPending, state];
};
