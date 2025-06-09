import { ReactNode } from 'react';
import {
  SelectedItems as SelectedItemsBase,
  SelectedItemsProps as SelectedItemsBaseProps
} from '@/libraries/ui/primitives/selected-items';
import { useFieldContext } from '../form-context';

export type SelectedItemProps<T> = Omit<SelectedItemsBaseProps<T>, 'values'>;

export const SelectedItems = <T,>({ className = 'mt-2 flex flex-wrap gap-1', ...props }: SelectedItemProps<T>): ReactNode => {
  const { state, setValue } = useFieldContext<T[]>();

  return (
    <SelectedItemsBase
      className={className}
      values={state.value}
      onClick={(valueToRemove: T) => (): void => {
        setValue(state.value.filter((value: T): boolean => value !== valueToRemove));
      }}
      {...props}
    />
  );
};
