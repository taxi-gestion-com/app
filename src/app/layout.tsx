import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { RiGithubFill, RiTwitterXFill } from 'react-icons/ri';
import '@/styles/globals.css';
import { Logo } from '@/features/brand';
import { appPageTitle } from '@/features/web';
import { PipeProviders } from '@/libraries/providers';
import { ReactQueryProvider } from '@/libraries/react-query';
import { type Category, Footer, FooterLegal, type FooterLink, FooterSocialLinks } from '@/libraries/ui/blocks/footer';
import { Toaster } from '@/libraries/ui/blocks/toaster';
import { ThemeChanger } from '@/libraries/ui/primitives/theme-changer';
import { ThemeProvider } from '@/libraries/ui/theme/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: appPageTitle()
};

const footerCategories: Category[] = [
  {
    name: 'Entreprise',
    links: [
      { key: 'about', linkProps: { href: '/about', children: 'À propos' } },
      { key: 'contact', linkProps: { href: '/contact', children: 'Contact' } }
    ]
  },
  {
    name: 'Support',
    links: [{ key: 'accessibility', linkProps: { href: '/accessibility', children: 'Accessibilité' } }]
  },
  {
    name: 'Resources',
    links: [{ key: 'brand', linkProps: { href: '/brand', children: 'Marque et logo' } }]
  },
  {
    name: 'Développeurs',
    links: [{ key: 'docs', linkProps: { href: '/docs', children: 'Documentation' } }]
  }
];

const socialLinks: FooterLink[] = [
  {
    key: 'twitter',
    linkProps: { href: 'https://twitter.com/redgreenrefactor', icon: <RiTwitterXFill size='24' />, children: 'Twitter' }
  },
  {
    key: 'github',
    linkProps: { href: 'https://www.github.com/redgreenrefactor', icon: <RiGithubFill size='24' />, children: 'GitHub' }
  }
];

const withReactQuery = (children: ReactNode) => <ReactQueryProvider>{children}</ReactQueryProvider>;

const withTheme = (children: ReactNode) => (
  <ThemeProvider attribute='data-theme' defaultTheme='dark' enableSystem disableTransitionOnChange>
    {children}
  </ThemeProvider>
);

const RootLayout = ({
  children
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang='en' suppressHydrationWarning data-theme='light'>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <PipeProviders providers={[withReactQuery, withTheme]}>
        <Toaster kind='alert-soft' directionY='toast-top' />
        {children}
        <div className='border-base-300 text-muted border-t border-solid'>
          <Footer className='bg-base-200' categories={footerCategories}>
            <Logo color='color-base-500' className='max-w-80 pb-4' />
            <ThemeChanger />
          </Footer>
          <FooterLegal
            className='bg-base-300'
            company='Red Green Refactor'
            privacyPolicyLink='/privacy'
            termsOfServiceLink='/terms'
          >
            <FooterSocialLinks links={socialLinks}></FooterSocialLinks>
          </FooterLegal>
        </div>
      </PipeProviders>
    </body>
  </html>
);

export default RootLayout;
