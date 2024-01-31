import { getUserServerSession } from '@/lib/auth';
import PageHeader from '@/components/PageHeader';
import UpdateUserPage from '@/components/Forms/UpdateUserPage';

export default async function Settings() {
  const session = await getUserServerSession();

  if (!session || !("apiToken" in session) || !session?.user?.id) {
    return null;
  }

  return (
    <>
      <PageHeader title="My settings" />
      <UpdateUserPage id={session?.user?.id ?? 0} apiToken={session.apiToken as string} />
    </>
  );
}
