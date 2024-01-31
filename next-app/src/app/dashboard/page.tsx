import { getUserServerSession } from '@/lib/auth';
import { DashboardCharts } from '@/components/dashboard';
import PageHeader from '@/components/PageHeader';

export default async function Dashboard() {
  const session = await getUserServerSession();

  if (!session || !("apiToken" in session)) {
    return null;
  }

  return (
    <>
      <PageHeader title={'Admin dashboard'} />
      <div className="mx-auto my-8">
        <DashboardCharts />
      </div>
    </>
  );
}
