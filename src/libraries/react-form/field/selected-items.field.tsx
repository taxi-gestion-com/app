import { ReactNode } from 'react';
import {
  SelectedItem as SelectedItemBase,
  SelectedItemProps as SelectedItemBaseProps
} from '@/libraries/ui/primitives/selected-items';
import { useFieldContext } from '../form-context';

export type SelectedItemProps<T> = Omit<SelectedItemBaseProps<T>, 'values'>;

export const SelectedItem = <T,>({ className = 'mt-2 flex flex-wrap gap-1', ...props }: SelectedItemProps<T>): ReactNode => {
  const { state, setValue } = useFieldContext<T[]>();

  return (
    <SelectedItemBase
      className={className}
      values={state.value}
      onClick={(valueToRemove: T) => (): void => {
        setValue(state.value.filter((value: T): boolean => value !== valueToRemove));
      }}
      {...props}
    />
  );
};
