import { ReactNode } from 'react';

export const PipeProviders = ({
  providers,
  children
}: {
  providers: ((pChildren: ReactNode) => ReactNode)[];
  children: ReactNode;
}): ReactNode =>
  providers.reduceRight(
    (providedChildren: ReactNode, provider: (pChildren: ReactNode) => ReactNode) => provider(providedChildren),
    children
  );
