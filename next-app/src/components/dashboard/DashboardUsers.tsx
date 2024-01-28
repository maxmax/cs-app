"use client"
import React, { FC } from 'react';
import { UserDataProps } from '@/lib/users/types';
import UpdateUser from '@/components/Buttons/UpdateUser';

interface DashboardUsersProps {
  users?: UserDataProps[];
  apiToken: string;
}

const DashboardUsers: FC<DashboardUsersProps> = ({ users, apiToken }) => {

  return (
    <>
      {users?.length ?
        <>
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
                  <td className="py-2 px-4 border-b text-right"><UpdateUser id={user.id ?? 0} apiToken={apiToken as string} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
        :
        <>
          Empty
        </>
      }
    </>
  );
};

export default DashboardUsers;
