import { Link, Text } from '@react-email/components';

export const EmailSignature = ({ service, baseUrl }: { service: string; baseUrl: string }) => (
  <Text>
    À très vite,
    <br />
    <strong>
      L’équipe de{' '}
      <Link className='text-primary' href={baseUrl}>
        {service}
      </Link>
    </strong>
  </Text>
);
