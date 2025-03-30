import { WelcomeUserWidget } from '@/features/user';

export const DashboardPage = async () => {
  return (
    <div className='flex h-screen justify-center p-6'>
      <div className='w-full max-w-7xl'>
        <h1 className='text-primary mb-2 text-4xl font-semibold'>Dashboard</h1>
        <WelcomeUserWidget />
      </div>
    </div>
  );
};
