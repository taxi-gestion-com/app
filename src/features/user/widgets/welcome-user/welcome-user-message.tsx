'use client';

import { useQuery } from '@tanstack/react-query';
import { welcomeUserQuery } from './welcome-user.query';

export const WelcomeUserMessage = ({ userId }: { userId: string }) => {
  const { data: user } = useQuery({
    queryKey: ['welcome-user', { userId }],
    queryFn: () => welcomeUserQuery({ userId })
  });

  return user ? (
    <p className='text-xl'>
      Hello <span className='font-bold'>{user.name}</span>, Welcome to your dashboard 👋
    </p>
  ) : null;
};
