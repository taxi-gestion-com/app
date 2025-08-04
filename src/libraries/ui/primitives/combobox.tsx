import { type UseComboboxReturnValue, useCombobox } from 'downshift';
import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';

export type ComboBoxData<TItem, TPayload> = {
  itemToString: (item: TItem | null) => string;
  beforeLoadSuggestions?: (inputValue: string) => Partial<TPayload>;
  loadSuggestions: (inputValue: string) => Promise<{ items: TItem[] } & TPayload>;
};

export type ComboBoxProps<TItem, TPayload extends object> = {
  defaultItems?: TItem[];
  defaultValue?: TItem;
  clearOnSelect?: boolean;
  children: (props: {
    getLabelProps: UseComboboxReturnValue<TItem>['getLabelProps'];
    getMenuProps: UseComboboxReturnValue<TItem>['getMenuProps'];
    getInputProps: UseComboboxReturnValue<TItem>['getInputProps'];
    getItemProps: UseComboboxReturnValue<TItem>['getItemProps'];
    isOpen: boolean;
    selectedItem: TItem | null;
    highlightedItem: TItem | null;
    items: TItem[];
    setItems: Dispatch<SetStateAction<TItem[]>>;
    payload: Omit<TPayload, 'items'>;
  }) => ReactNode;
} & ComboBoxData<TItem, TPayload>;

export const ComboBox = <TItem, TPayload extends object>({
  defaultItems = [],
  defaultValue,
  beforeLoadSuggestions,
  loadSuggestions,
  itemToString,
  clearOnSelect = false,
  children
}: ComboBoxProps<TItem, TPayload>) => {
  const [items, setItems] = useState<TItem[]>(defaultItems);
  const [payload, setPayload] = useState<TPayload>({} as TPayload);

  const { getLabelProps, getInputProps, getMenuProps, getItemProps, setInputValue, isOpen, selectedItem, highlightedIndex } =
    useCombobox({
      onInputValueChange: async ({ inputValue }: { inputValue: string }): Promise<void> => {
        setPayload((prevState: TPayload) => ({ ...prevState, ...beforeLoadSuggestions?.(inputValue) }));
        const { items: newItems, ...newPayload } = await loadSuggestions(inputValue);
        setItems(newItems);
        setPayload(newPayload as TPayload);
      },
      items,
      itemToString,
      onSelectedItemChange: () => {
        if (!clearOnSelect) return;
        setInputValue('');
        setItems([]);
      },
      defaultInputValue: itemToString(defaultValue ?? null)
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
    setItems,
    payload
  });
};
