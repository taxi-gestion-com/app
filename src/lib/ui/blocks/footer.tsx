import { ReactNode } from 'react';
import { RiCopyrightLine } from 'react-icons/ri';
import { Logo } from '@/features/brand';
import { ThemeChanger } from '@/lib/ui/elements/theme-changer';
import { Link } from '@/lib/ui/elements/link';

type Category = {
  name: string;
  links: { key: string; element: ReactNode }[];
};

export const Footer = ({
  size = 'lg',
  company,
  privacyPolicyLink,
  termsOfServiceLink,
  categories = [],
  socialNetworks = []
}: {
  size?: 'sm' | 'lg';
  company: string;
  privacyPolicyLink: string;
  termsOfServiceLink: string;
  categories?: Category[];
  socialNetworks?: { key: string; element: ReactNode }[];
}) => (
  <footer className='border-body-tertiary border-t border-solid'>
    {size === 'lg' && (
      <div className='text-base-content/60 bg-body-secondary py-12'>
        <div className='container mx-auto flex flex-col justify-between gap-6 px-6 md:flex-row'>
          <div>
            <Logo color='color-neutral' className='max-w-80 pb-4' />
            <ThemeChanger />
          </div>
          {categories.length > 0 && (
            <div className={`mt-4 grid grid-cols-2 gap-6 md:mt-0 md:grid-cols-${categories.length}`}>
              {categories.map((category, index) => (
                <nav key={category.name} className='flex flex-col space-y-2' aria-labelledby={`footer-title-${index}`}>
                  <h2 id={`footer-title-${index}`} className='text-foreground mb-2 font-semibold'>
                    {category.name}
                  </h2>
                  <ul className='text-sm'>
                    {category.links.map((link) => (
                      <li key={link.key}>{link.element}</li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
    <div className='bg-body-tertiary text-base-content/60 flex justify-between py-6'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row'>
        <nav aria-label='Legal and Resource Links'>
          <ul className='flex flex-row flex-wrap gap-4 text-xs'>
            <li className='flex items-center gap-1'>
              <RiCopyrightLine /> {new Date().getFullYear()} {company}. Tous droits réservés.
            </li>
            <li>
              <Link variant='none' href={termsOfServiceLink}>
                Conditions d’utilisation
              </Link>
            </li>
            <li>
              <Link variant='none' href={privacyPolicyLink}>
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link variant='none' href='/sitemap'>
                Sitemap
              </Link>
            </li>
          </ul>
        </nav>
        {socialNetworks.length > 0 && (
          <nav aria-label="GitHub's Social Media Links">
            <ul className='flex flex-row gap-4'>
              {socialNetworks.map((socialNetwork) => (
                <li key={socialNetwork.key}>{socialNetwork.element}</li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  </footer>
);
