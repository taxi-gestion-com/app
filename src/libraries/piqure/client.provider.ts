'use client';

import type { InjectionKey } from 'piqure/src/Providing';
import type { ReactNode } from 'react';
import { provideLazy } from './index';

export const ClientProvider = <TBind, TTo extends TBind>({
  bind,
  to,
  children
}: {
  bind: InjectionKey<TBind>;
  to: TTo;
  children: ReactNode;
}) => {
  provideLazy(bind, () => to);
  return children;
};
