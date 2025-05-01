import { Link, type LinkProps } from '@/libraries/ui/elements/link';

export type FooterLink = {
  key: string;
  linkProps: LinkProps;
};

export const FooterLinks = ({ links }: { links: FooterLink[] }) =>
  links.map(({ key, linkProps }) => <Link key={key} color='none' {...linkProps} />);
