import type { ReactNode } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { Badge } from '@/libraries/ui/primitives/badge';
import { Button } from '@/libraries/ui/primitives/button';

export type SelectedItemsData<T> = {
  itemToKey: (value: T) => string;
  itemToString: (value: T) => string;
};

export type SelectedItemsProps<T> = {
  values: T[];
  itemToKey: (value: T) => string;
  itemToString: (value: T) => string;
  onClick?: (value: T) => () => void;
  className?: string;
};

export const SelectedItems = <T,>({ values, itemToString, itemToKey, onClick, className }: SelectedItemsProps<T>) =>
  values.length > 0 && (
    <ul className={className}>
      {values.map(
        (value: T): ReactNode => (
          <li key={itemToKey(value)}>
            {onClick ? (
              <Button color='btn-primary' kind='btn-soft' scale='btn-xs' type='button' onClick={onClick(value)}>
                {itemToString(value)}
                <RiCloseLine />
              </Button>
            ) : (
              <Badge color='badge-primary'>{itemToString(value)}</Badge>
            )}
          </li>
        )
      )}
    </ul>
  );
