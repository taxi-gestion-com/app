import { KeyboardEvent } from 'react';
import { equals } from 'effect/Equal';
import { ComboBox as ComboBoxBase, type ComboBoxProps as ComboBoxBaseProps } from '@/libraries/ui/primitives/combobox';
import { useFieldContext } from '@/libraries/react-form/form-context';

export type ComboBoxProps<TItem, TValue> = ComboBoxBaseProps<TItem> & {
  isPending: boolean;
  itemToValue: (item: TItem) => TValue;
  itemToKey: (item: TItem) => string;
  valueToKey: (value: TValue) => string;
};

const getMultipleSelection = <TValue,>(state: { value: TValue | TValue[] }): state is { value: TValue[] } =>
  Array.isArray(state.value);

const alreadyExist =
  <TValue,>({ valueToKey }: { valueToKey: (value: TValue) => string }) =>
  (newValue: TValue) =>
  (value: TValue): boolean =>
    equals(valueToKey(value), valueToKey(newValue));

export const ComboBox = <TItem, TValue>(comboBoxProps: ComboBoxProps<TItem, TValue>) => {
  const { name, form, state, setValue, setMeta } = useFieldContext<TValue>();

  const isMultipleSelection = getMultipleSelection(state);
  const defaultValue: TValue = form.options.defaultValues[name];

  const appendValue = (item: TItem, values: TValue[]): void => {
    const value: TValue = comboBoxProps.itemToValue(item);
    if (values.some(alreadyExist(comboBoxProps)(value))) return;
    setValue([...values, value] as TValue);
  };

  return (
    <ComboBoxBase {...comboBoxProps} clearOnSelect={isMultipleSelection}>
      {({ getLabelProps, getInputProps, getMenuProps, getItemProps, isOpen, selectedItem, highlightedItem, items, setItems }) =>
        comboBoxProps.children({
          getLabelProps,
          getMenuProps,
          getInputProps: <TOptions,>(options: TOptions) =>
            getInputProps({
              isConnected: false,
              disabled: comboBoxProps.isPending,
              onFocusCapture: () => {
                if (isMultipleSelection || !equals(state.value, defaultValue)) return;
                setValue(defaultValue);
              },
              onInput: () => {
                if (isMultipleSelection) return;
                setValue(defaultValue);
              },
              onBlur: () => {
                setMeta({ ...state.meta, isBlurred: true });
                setItems([]);
              },
              onKeyDown: (e: KeyboardEvent<HTMLInputElement>): void => {
                if (e.key !== 'Enter' || highlightedItem == null) return;
                return isMultipleSelection
                  ? appendValue(highlightedItem, state.value)
                  : setValue(comboBoxProps.itemToValue(highlightedItem));
              },
              ...options
            }),
          getItemProps: (options) =>
            getItemProps({
              onClick: () =>
                isMultipleSelection
                  ? appendValue(options.item, state.value)
                  : setValue(comboBoxProps.itemToValue(options.item)),
              ...options
            }),
          isOpen,
          highlightedItem,
          selectedItem,
          items,
          setItems
        })
      }
    </ComboBoxBase>
  );
};
