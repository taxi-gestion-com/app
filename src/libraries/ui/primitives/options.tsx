import type { ReactNode } from 'react';
import { cn } from '@/libraries/utils';

export type OptionsData<T> = {
  itemToKey: (item: T) => string;
  renderItem: ({
    item,
    index,
    isSelected,
    isHighlighted
  }: {
    item: T;
    index: number;
    isSelected: boolean;
    isHighlighted: boolean;
  }) => ReactNode;
};

export const Options = <T,>({
  items,
  isOpen = false,
  showEmpty = false,
  selectedItem,
  highlightedItem,
  getMenuProps,
  getItemProps,
  itemToKey,
  renderItem,
  children
}: {
  items: T[];
  isOpen?: boolean;
  showEmpty?: boolean;
  selectedItem: T | null;
  highlightedItem: T | null;
  getMenuProps?: () => object;
  getItemProps?: ({ item, index }: { item: T; index: number }) => object;
  children?: ReactNode;
} & OptionsData<T>) => (
  <div
    className={cn(
      'menu bg-input rounded-field border-base-200 absolute z-10 mt-1.5 w-72 flex-nowrap border shadow-lg',
      !(isOpen && (items.length || showEmpty)) && 'hidden'
    )}
  >
    <ul className='max-h-50 overflow-scroll' {...getMenuProps?.()}>
      {isOpen &&
        items.map(
          (item: T, index: number): ReactNode => (
            <li
              {...getItemProps?.({ item, index })}
              key={itemToKey(item)}
              className={cn(item === highlightedItem && 'bg-base-200', item === selectedItem && 'font-bold')}
            >
              {renderItem({ item, index, isHighlighted: item === highlightedItem, isSelected: item === selectedItem })}
            </li>
          )
        )}
    </ul>
    {children}
  </div>
);
