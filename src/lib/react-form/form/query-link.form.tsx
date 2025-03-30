import { ReactNode } from 'react';
import { type ReactFormExtendedApi } from '@tanstack/react-form';
import { Link } from '@/lib/ui/elements/link';
import { useFormContext } from '../form-context';

export const QueryLink = ({
  queryParam,
  pathname,
  children
}: {
  queryParam: string;
  pathname: string;
  children: ReactNode;
}) => {
  const form = useFormContext() as unknown as ReactFormExtendedApi<
    Record<string, string>,
    never,
    never,
    never,
    never,
    never,
    never,
    never,
    never,
    never
  >;

  return (
    <form.Subscribe selector={({ values }) => values[queryParam]}>
      {(value) => <Link href={{ pathname, query: (value?.length ?? 0) > 0 ? { username: value } : {} }}>{children}</Link>}
    </form.Subscribe>
  );
};
