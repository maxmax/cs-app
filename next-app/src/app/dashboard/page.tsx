import { getUserServerSession } from '@/lib/auth';
import { getUsers } from '@/lib/users';
import { UserDataProps } from '@/lib/users/types';
import { DashboardUsers, DashboardCharts } from '@/components/dashboard';

export default async function Dashboard() {
  const session = await getUserServerSession();

  if (!session || !("apiToken" in session)) {
    return null;
  }

  const users: UserDataProps[] = await getUsers(session.apiToken as string);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pt-16 sm:pt-24 lg:max-w-none lg:pt-24">
          <h2 className="text-2xl font-bold text-gray-900">Admin dashboard</h2>
        </div>
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
