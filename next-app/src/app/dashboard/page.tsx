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
    <>
      <PageHeader title={'Admin dashboard'} />
      <div className="mx-auto my-8">
        <DashboardCharts />
      </div>
      <div className="mx-auto my-8">
        <DashboardUsers users={users} apiToken={session.apiToken} />
      </div>
    </>
  );
}
