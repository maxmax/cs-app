"use client"
import { useClientSession, signOut } from '@/lib/auth';
import { FC } from 'react';
import Link from '@/components/Link';
import UserMenu from '@/components/UserMenu';

const UserHead: FC = () => {

  const session  = useClientSession();

  const handleLogout = async () => {
    const response = await signOut();
  };

  return (
    <>
      {session?.user && session?.user?.username ?
        <UserMenu logout={handleLogout} slug={session?.user?.id} name={session?.user?.username} />
        :
        <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Sign in
        </Link>
      }
    </>
  );
};

export default UserHead;
