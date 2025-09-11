import type { AnyFormApi } from '@tanstack/react-form';
import type { FormEvent } from 'react';

export const handleSubmit = (form: AnyFormApi) => async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();
  await form.handleSubmit();
};
