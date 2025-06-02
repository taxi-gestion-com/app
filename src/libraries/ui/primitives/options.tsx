import { ReactNode } from 'react';
import { cn } from '@/libraries/utils';

export const Options = <T,>({
  items,
  isOpen = false,
  selectedItem,
  highlightedItem,
  getMenuProps,
  getItemProps,
  itemToKey,
  renderItem
}: {
  items: T[];
  itemToKey: (item: T) => string;
  isOpen?: boolean;
  selectedItem: T | null;
  highlightedItem: T | null;
  getMenuProps?: () => object;
  getItemProps?: ({ item, index }: { item: T; index: number }) => object;
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
}) => (
  <ul
    {...getMenuProps?.()}
    className={cn(
      'menu bg-input rounded-field border-base-200 absolute z-10 mt-1.5 max-h-80 w-72 flex-nowrap overflow-scroll border shadow-lg',
      !(isOpen && items.length) && 'hidden'
    )}>
    {isOpen &&
      items.map(
        (item: T, index: number): ReactNode => (
          <li
            {...getItemProps?.({ item, index })}
            key={itemToKey(item)}
            className={cn(item === highlightedItem && 'bg-base-200', item === selectedItem && 'font-bold')}>
            {renderItem({ item, index, isHighlighted: item === highlightedItem, isSelected: item === selectedItem })}
          </li>
        )
      )}
  </ul>
);
