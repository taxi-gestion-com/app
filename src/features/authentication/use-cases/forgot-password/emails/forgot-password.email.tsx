import { Column, Row, Text } from '@react-email/components';
import { EmailButton, EmailLayout, EmailSignature } from '@/libraries/react-email';

type ResetPasswordEmailProps = {
  username?: string;
  updatedDate: Date;
  baseUrl: string;
};

const formatDate = (updatedDate: Date | undefined) =>
  new Intl.DateTimeFormat('fr', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(updatedDate);

export const ResetPasswordEmail = ({ username, updatedDate, baseUrl }: ResetPasswordEmailProps) => (
  <EmailLayout baseUrl={baseUrl} preview='Vous avez demandé à réinitialiser votre mot de passe.'>
    <Text>Bonjour{username != null ? ` ${username}` : ''} 👋</Text>
    <Text>
      Vous avez demandé à réinitialiser votre mot de passe le <b>{formatDate(updatedDate)}</b>.
    </Text>
    <Text>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe&nbsp;:</Text>
    <Row>
      <Column className='text-center'>
        <EmailButton href={`${baseUrl}/reset-password`}>Réinitialiser mon mot de passe</EmailButton>
        <Text className='text-muted mb-0'>Ce lien est valable pendant 24 heures.</Text>
      </Column>
    </Row>
    <Text>
      Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce message, votre mot de passe restera inchangé.
    </Text>
    <EmailSignature baseUrl={baseUrl} service='Taxi Gestion' />
  </EmailLayout>
);

ResetPasswordEmail.PreviewProps = {
  username: 'alanturing',
  updatedDate: new Date('April 23, 2025 4:06:00 pm UTC'),
  baseUrl: 'http://localhost:3000'
};
