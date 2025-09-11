import { createFormHook } from '@tanstack/react-form';
import { lazy, type ReactNode } from 'react';
import type { ComboBoxProps } from './fields/combobox.field';
import type { SelectedItemProps } from './fields/selected-items.field';
import { fieldContext, formContext } from './form-context';

const Input = lazy(() => import('./fields/input.field').then((module) => ({ default: module.Input })));
const Label = lazy(() => import('./fields/label.field').then((module) => ({ default: module.Label })));
const Group = lazy(() => import('./fields/group.field').then((module) => ({ default: module.Group })));
const Info = lazy(() => import('./fields/info.field').then((module) => ({ default: module.Info })));
const Checkbox = lazy(() => import('./fields/checkbox.field').then((module) => ({ default: module.Checkbox })));
const Combobox = lazy(() => import('./fields/combobox.field').then((module) => ({ default: module.ComboBox }))) as <
  TItem,
  TPayload extends object
>(
  props: ComboBoxProps<TItem, TPayload>
) => ReactNode;
const SelectedItems = lazy(() =>
  import('./fields/selected-items.field').then((module) => ({ default: module.SelectedItems }))
) as <T>(props: SelectedItemProps<T>) => ReactNode;

const QueryLink = lazy(() => import('./form/query-link.form').then((module) => ({ default: module.QueryLink })));
const Submit = lazy(() => import('./form/submit.form').then((module) => ({ default: module.Submit })));

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Group,
    Input,
    Label,
    Info,
    Checkbox,
    Combobox,
    SelectedItems
  },
  formComponents: { QueryLink, Submit }
});
