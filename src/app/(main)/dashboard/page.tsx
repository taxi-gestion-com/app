import { Metadata } from 'next';
import { DashboardPage } from '@/features/overview';
import { appPageTitle } from '@/features/web';
import { ClientProvider } from '@/libraries/piqure';
import { USER_INFORMATIONS_KEY } from '@/features/overview/use-cases/dashboard/user-informations.key';
import { userInformationsMutation } from '@/features/overview/use-cases/dashboard/user-informations.mutation';

export const metadata: Metadata = {
  title: appPageTitle('Tableau de bord')
};

const Page = async () => {
  return (
    <ClientProvider bind={USER_INFORMATIONS_KEY} to={userInformationsMutation}>
      <DashboardPage />
    </ClientProvider>
  );
};

export default Page;
