"use client"
import { useSession, signOut } from "next-auth/react";
import { FC } from 'react';
import Link from '@/components/Link';
import UserMenu from '@/components/UserMenu';

const UserHead: FC = () => {

  const { data: session } = useSession();

  const handleLogout = async () => {
    const response = await signOut();
  };

  return (
    <>
      {session?.user ?
        <UserMenu logout={handleLogout} />
        :
        <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Sign in
        </Link>
      }
    </>
  );
};

export default UserHead;
