import { FormEvent } from 'react';
import { AnyFormApi } from '@tanstack/react-form';

export const handleSubmit = (form: AnyFormApi) => async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();
  await form.handleSubmit();
};
