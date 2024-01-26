import { getUserServerSession } from '@/lib/auth';
import { getUsers } from '@/lib/users';
import { UserDataProps } from '@/lib/users/types';
import UpdateUser from '@/components/Buttons/UpdateUser';

export default async function Office() {
  const session = await getUserServerSession();

  if (!session || !("apiToken" in session)) {
    return null;
  }

  const users: UserDataProps[] = await getUsers(session.apiToken as string);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pt-16 sm:pt-24 lg:max-w-none lg:pt-24">
          <h2 className="text-2xl font-bold text-gray-900">Admin page</h2>
        </div>
        <div className="mx-auto py-8">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">id</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-right">Settings</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserDataProps) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b text-right"><UpdateUser id={user.id ?? 0} apiToken={session.apiToken as string} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
