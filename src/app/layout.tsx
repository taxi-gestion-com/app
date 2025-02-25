import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { RiGithubFill, RiTwitterXFill } from 'react-icons/ri';
import '@/styles/globals.css';
import { appPageTitle } from '@/features/web';
import { Footer } from '@/lib/ui/blocks';
import { Link } from '@/lib/ui/elements/link';
import { ThemeProvider } from '@/lib/ui/theme-provider';

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

const RootLayout = ({
  children
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang='en' suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
        {children}
        <Footer
          company='Red Green Refactor'
          privacyPolicyLink='/privacy'
          termsOfServiceLink='/terms'
          categories={[
            {
              name: 'Entreprise',
              links: [
                {
                  key: 'about',
                  element: (
                    <Link variant='none' href='/about'>
                      À propos
                    </Link>
                  )
                },
                {
                  key: 'contact',
                  element: (
                    <Link variant='none' href='/contact'>
                      Contact
                    </Link>
                  )
                }
              ]
            },
            {
              name: 'Support',
              links: [
                {
                  key: 'accessibility',
                  element: (
                    <Link variant='none' href='/accessibility'>
                      Accessibilité
                    </Link>
                  )
                }
              ]
            },
            {
              name: 'Resources',
              links: [
                {
                  key: 'brand',
                  element: (
                    <Link variant='none' href='/brand'>
                      Marque et logo
                    </Link>
                  )
                }
              ]
            },
            {
              name: 'Développeurs',
              links: [
                {
                  key: 'docs',
                  element: (
                    <Link variant='none' href='/docs'>
                      Documentation
                    </Link>
                  )
                }
              ]
            }
          ]}
          socialNetworks={[
            {
              key: 'twitter',
              element: (
                <Link
                  variant='none'
                  href='https://twitter.com/redgreenrefactor'
                  icon={<RiTwitterXFill size='20' />}
                  iconOnly={true}
                  target='_blank'>
                  Twitter
                </Link>
              )
            },
            {
              key: 'github',
              element: (
                <Link
                  variant='none'
                  href='https://www.github.com/redgreenrefactor'
                  icon={<RiGithubFill size='20' />}
                  iconOnly={true}
                  target='_blank'>
                  GitHub
                </Link>
              )
            }
          ]}
        />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
