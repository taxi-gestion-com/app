import { loggedInUserOrRedirect } from '@/libraries/better-auth';

export const DashboardPage = async () => {
  const { name } = await loggedInUserOrRedirect();

  return (
    <>
      <h1 className='text-primary mb-2 text-4xl font-semibold'>Tableau de bord</h1>
      <p className='text-xl'>
        Bonjour <span className='font-bold'>{name}</span>, bienvenue sur votre tableau de bord 👋
      </p>
    </>
  );
};
