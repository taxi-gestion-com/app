import { type KeyboardEvent } from 'react';
import { equals } from 'effect/Equal';
import {
  ComboBox as ComboBoxBase,
  type ComboBoxProps as ComboBoxBaseProps,
  type ComboBoxData as ComboBoxBaseData
} from '@/libraries/ui/primitives/combobox';
import { useFieldContext } from '../form-context';

export type ComboBoxData<TItem, TPayload> = ComboBoxBaseData<TItem, TPayload> & {
  itemToKey: (item: TItem) => string;
};

export type ComboBoxProps<TItem, TPayload extends object> = ComboBoxBaseProps<TItem, TPayload> & {
  isPending: boolean;
  itemToKey: (item: TItem) => string;
};

const getMultipleSelection = <TItem,>(state: { value: TItem | TItem[] }): state is { value: TItem[] } =>
  Array.isArray(state.value);

const alreadyExist =
  <TItem,>({ itemToKey }: { itemToKey: (value: TItem) => string }) =>
  (newValue: TItem) =>
  (value: TItem): boolean =>
    equals(itemToKey(value), itemToKey(newValue));

export const ComboBox = <TItem, TPayload extends object>(comboBoxProps: ComboBoxProps<TItem, TPayload>) => {
  const { form, name, state, setValue, setMeta } = useFieldContext<TItem>();

  const isMultipleSelection = getMultipleSelection(state);
  const defaultValue: TItem = form.options.defaultValues[name];

  const appendValue = (value: TItem, values: TItem[]): void => {
    if (values.some(alreadyExist(comboBoxProps)(value))) return;
    setValue([...values, value] as TItem);
  };

  return (
    <ComboBoxBase {...comboBoxProps} clearOnSelect={isMultipleSelection} defaultValue={defaultValue}>
      {({
        getLabelProps,
        getInputProps,
        getMenuProps,
        getItemProps,
        isOpen,
        selectedItem,
        highlightedItem,
        items,
        setItems,
        payload
      }) =>
        comboBoxProps.children({
          getLabelProps,
          getMenuProps,
          getInputProps: <TOptions,>(options: TOptions) =>
            getInputProps({
              isConnected: false,
              disabled: comboBoxProps.isPending,
              onFocusCapture: () => {
                if (isMultipleSelection || comboBoxProps.itemToString(state.value) !== '') return;
                setValue(null as TItem);
              },
              onInput: () => {
                if (isMultipleSelection) return;
                setValue(null as TItem);
              },
              onBlur: () => {
                setMeta({ ...state.meta, isBlurred: true });
                if (isMultipleSelection) setItems([]);
              },
              onKeyDown: (e: KeyboardEvent<HTMLInputElement>): void => {
                if (e.key !== 'Enter' || highlightedItem == null) return;
                return isMultipleSelection ? appendValue(highlightedItem, state.value) : setValue(highlightedItem);
              },
              ...options
            }),
          getItemProps: (options) =>
            getItemProps({
              onClick: () => (isMultipleSelection ? appendValue(options.item, state.value) : setValue(options.item)),
              ...options
            }),
          isOpen,
          highlightedItem,
          selectedItem,
          items,
          setItems,
          payload
        })
      }
    </ComboBoxBase>
  );
};
