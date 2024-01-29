import { getUserServerSession } from '@/lib/auth';
import { getUsers } from '@/lib/users';
import { UserDataProps } from '@/lib/users/types';
import { DashboardUsers, DashboardCharts } from '@/components/dashboard';
import PageHeader from '@/components/PageHeader';

export default async function Dashboard() {
  const session = await getUserServerSession();

  if (!session || !("apiToken" in session)) {
    return null;
  }

  const users: UserDataProps[] = await getUsers(session.apiToken as string);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl py-8 sm:py-8 lg:max-w-none px-4 sm:px-6 lg:px-8">
        <PageHeader title={'Admin dashboard'} />
        <div className="mx-auto my-8">
          <DashboardCharts />
        </div>
        <div className="mx-auto my-8">
          <DashboardUsers users={users} apiToken={session.apiToken} />
        </div>
      </div>
    </div>
  );
}
