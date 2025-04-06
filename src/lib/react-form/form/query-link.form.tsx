import { type ReactFormExtendedApi } from '@tanstack/react-form';
import { Link, LinkProps } from '@/lib/ui/elements/link';
import { useFormContext } from '../form-context';

export const QueryLink = ({
  queryParam,
  pathname,
  ...props
}: {
  queryParam: string;
  pathname: string;
} & Omit<LinkProps, 'href'>) => {
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
      {(value) => <Link href={{ pathname, query: (value?.length ?? 0) > 0 ? { username: value } : {} }} {...props} />}
    </form.Subscribe>
  );
};
