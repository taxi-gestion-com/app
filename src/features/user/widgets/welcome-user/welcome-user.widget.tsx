import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { WelcomeUserMessage } from './welcome-user-message';
import { welcomeUserQuery } from './welcome-user.query';

export const WelcomeUserWidget = async () => {
  const userId = '8bad5d61-e6f2-488f-9d41-1607f07ff91d';
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['welcome-user', { userId }],
    queryFn: () => welcomeUserQuery({ userId })
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WelcomeUserMessage userId={userId} />
    </HydrationBoundary>
  );
};
