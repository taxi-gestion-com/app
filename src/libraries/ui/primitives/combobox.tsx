import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';
import { useCombobox, type UseComboboxReturnValue } from 'downshift';

export type ComboBoxData<TItem, TPayload> = {
  itemToString: (item: TItem | null) => string;
  beforeLoadSuggestions?: (inputValue: string, selectedValue?: TItem | TItem[]) => Partial<TPayload>;
  loadSuggestions: (inputValue: string, selectedValue?: TItem | TItem[]) => Promise<{ items: TItem[] } & TPayload>;
};

export type ComboBoxProps<TItem, TPayload extends object> = {
  defaultItems?: TItem[];
  defaultValue?: TItem;
  selectedValue?: TItem | TItem[];
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
  selectedValue,
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
        setPayload((prevState: TPayload) => ({ ...prevState, ...beforeLoadSuggestions?.(inputValue, selectedValue) }));
        const { items: newItems, ...newPayload } = await loadSuggestions(inputValue, selectedValue);
        setItems(newItems);
        setPayload(newPayload as TPayload);
      },
      items,
      itemToString,
      onSelectedItemChange: () => {
        if (clearOnSelect) setInputValue('');
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
