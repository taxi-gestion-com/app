import { lazy } from 'react';
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './form-context';

const Input = lazy(() => import('./field/input.field').then((module) => ({ default: module.Input })));
const Label = lazy(() => import('./field/label.field').then((module) => ({ default: module.Label })));
const Item = lazy(() => import('./field/item.field').then((module) => ({ default: module.Item })));
const Info = lazy(() => import('./field/info.field').then((module) => ({ default: module.Info })));
const Checkbox = lazy(() => import('./field/checkbox.field').then((module) => ({ default: module.Checkbox })));

const QueryLink = lazy(() => import('./form/query-link.form').then((module) => ({ default: module.QueryLink })));
const Submit = lazy(() => import('./form/submit.form').then((module) => ({ default: module.Submit })));

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { Item, Input, Label, Info, Checkbox },
  formComponents: { QueryLink, Submit }
});
