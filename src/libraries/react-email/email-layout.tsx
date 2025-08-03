import { Body, Container, Head, Html, Img, Preview, Section, Tailwind } from '@react-email/components';
import type { ReactNode } from 'react';

type EmailLayoutProps = {
  baseUrl: string;
  preview: string;
  children: ReactNode;
};

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        primary: '#0559D2',
        muted: '#636363',
        'base-200': '#EEEEEE'
      }
    }
  }
};

export const EmailLayout = ({ baseUrl, preview, children }: EmailLayoutProps) => (
  <Html>
    <Head />
    <Tailwind config={tailwindConfig}>
      <Body className='bg-base-200 p-6 font-[ubuntu,segoe-ui,sans-serif]'>
        <Preview>{preview}</Preview>
        <Container className='my-16 rounded-lg bg-white'>
          <Section className='bg-primary rounded-t-lg p-8'>
            <Img width={275} src={`${baseUrl}/logo/taxi-gestion.svg`} alt='Taxi Gestion' className='m-auto' />
          </Section>
          <Section className='px-6 py-2'>{children}</Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
