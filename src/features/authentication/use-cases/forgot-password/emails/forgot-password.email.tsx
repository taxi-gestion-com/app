import { Link, Text, Button, Row, Column } from '@react-email/components';
import EmailLayout from '@/libraries/react-email/email-layout';

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
  <EmailLayout baseUrl={baseUrl}>
    <Text>Bonjour{username != null ? ` ${username}` : ''} 👋</Text>
    <Text>
      Vous avez demandé à réinitialiser votre mot de passe le <b>{formatDate(updatedDate)}</b>.
    </Text>
    <Text>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe&nbsp;:</Text>
    <Row>
      <Column className='text-center'>
        <Button
          className='bg-primary rounded px-6 py-3 text-center font-semibold text-white'
          href={`${baseUrl}/reset-password`}>
          Réinitialiser mon mot de passe
        </Button>
        <Text className='text-muted mb-0'>Ce lien est valable pendant 24 heures</Text>
      </Column>
    </Row>
    <Text>
      Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce message, votre mot de passe restera inchangé.
    </Text>
    <Text>
      À bientôt,
      <br />
      L’équipe de support de{' '}
      <Link className='text-primary' href={baseUrl}>
        Taxi Gestion
      </Link>
    </Text>
  </EmailLayout>
);

ResetPasswordEmail.PreviewProps = {
  username: 'alanturing',
  updatedDate: new Date('April 23, 2025 4:06:00 pm UTC'),
  baseUrl: 'http://localhost:3000'
};
