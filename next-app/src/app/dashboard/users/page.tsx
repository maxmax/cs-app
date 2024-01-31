import { getUserServerSession } from '@/lib/auth';
import { getUsers } from '@/lib/users';
import { UserDataProps } from '@/lib/users/types';
import { DashboardUsers } from '@/components/dashboard';
import PageHeader from '@/components/PageHeader';

export default async function Users() {
  const session = await getUserServerSession();

  if (!session || !("apiToken" in session)) {
    return null;
  }

  const users: UserDataProps[] = await getUsers(session.apiToken as string);

  return (
    <>
      <PageHeader title={'Admin dashboard/Users'} />
      <div className="mx-auto my-8">
        <DashboardUsers users={users} apiToken={session.apiToken} />
      </div>
    </>
  );
}
