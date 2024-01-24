"use client"
import { useSession, signOut } from "next-auth/react";
import { FC } from 'react';
import Link from '@/components/Link';
import UserMenu from '@/components/UserMenu';

const UserHead: FC<void> = () => {

  const { data: session } = useSession();

  const handleLogout = async () => {
    const response = await signOut();

    if (response?.ok) {
      console.log('Exit is successful');
    } else {
      console.error('Exit error:', response?.error ?? 'Unknown error');
    }
  };

  return (
    <>
      {session?.user?.name ?
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
