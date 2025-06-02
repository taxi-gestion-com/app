import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';
import { useCombobox, type UseComboboxReturnValue } from 'downshift';

export type ComboBoxProps<T> = {
  defaultItems?: T[];
  loadSuggestions: (inputValue: string) => Promise<T[]>;
  itemToString: (item: T | null) => string;
  clearOnSelect?: boolean;
  children: (props: {
    getLabelProps: UseComboboxReturnValue<T>['getLabelProps'];
    getMenuProps: UseComboboxReturnValue<T>['getMenuProps'];
    getInputProps: UseComboboxReturnValue<T>['getInputProps'];
    getItemProps: UseComboboxReturnValue<T>['getItemProps'];
    isOpen: boolean;
    selectedItem: T | null;
    highlightedItem: T | null;
    items: T[];
    setItems: Dispatch<SetStateAction<T[]>>;
  }) => ReactNode;
};

export const ComboBox = <T,>({
  defaultItems = [],
  loadSuggestions,
  itemToString,
  clearOnSelect = false,
  children
}: ComboBoxProps<T>) => {
  const [items, setItems] = useState<T[]>(defaultItems);

  const { getLabelProps, getInputProps, getMenuProps, getItemProps, setInputValue, isOpen, selectedItem, highlightedIndex } =
    useCombobox({
      onInputValueChange: async ({ inputValue }: { inputValue: string }): Promise<void> =>
        setItems(await loadSuggestions(inputValue)),
      items,
      itemToString,
      onSelectedItemChange: () => {
        if (clearOnSelect) setInputValue('');
      }
    });

  return children({
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    isOpen,
    selectedItem,
    highlightedItem: items[highlightedIndex] ?? null,
    items,
    setItems
  });
};
