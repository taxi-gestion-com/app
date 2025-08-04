import { Column, Row, Text } from '@react-email/components';
import { EmailButton, EmailLayout, EmailSignature } from '@/libraries/react-email';

type ResetPasswordEmailProps = {
  username?: string;
  baseUrl: string;
  token: string;
};

export const EmailVerificationEmail = ({ username, baseUrl, token }: ResetPasswordEmailProps) => (
  <EmailLayout baseUrl={baseUrl} preview='Vous venez de créer votre compte, il ne reste plus qu’à l’activer.'>
    <Text>
      Bonjour{username != null ? ` ${username}` : ''} et bienvenue sur <strong>Taxi Gestion</strong> 🙌
    </Text>
    <Text>
      Il ne vous reste plus qu’une étape pour activer votre compte&nbsp;: cliquez sur le bouton ci-dessous pour vérifier votre
      adresse électronique.
    </Text>
    <Row>
      <Column className='text-center'>
        <EmailButton href={`${baseUrl}/activate?token=${token}`}>Activer mon compte</EmailButton>
        <Text className='text-muted mb-0'>Ce lien est valable pendant une heure.</Text>
      </Column>
    </Row>
    <Text>Si vous n’êtes pas à l’origine de cette inscription, vous pouvez ignorer ce message.</Text>
    <EmailSignature baseUrl={baseUrl} service='Taxi Gestion' />
  </EmailLayout>
);

EmailVerificationEmail.PreviewProps = {
  username: 'alanturing',
  baseUrl: 'http://localhost:3000',
  token: 'ae1547f526bb8552cd7841112dee21a4332'
};
