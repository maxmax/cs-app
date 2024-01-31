import React, { FC } from "react";
import Link from '@/components/Link';
import MainNavigation from '@/components/navigation/Main';
import UserHead from '@/components/UserHead';

interface HeaderProps {
  role?: string | null | undefined;
}

const Header: FC<HeaderProps> = ({ role }) => {

  const links = [
    { href: '/', label: 'Home' },
    { href: '/cats', label: 'Cats' },
  ];

  if (role && role === 'admin') {
    links.push({ href: '/dashboard', label: 'Dashboard' });
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-semibold">
          CatsApp 🐈
        </Link>
        <MainNavigation links={links} />
        <div className="relative ml-3">
          <UserHead />
        </div>
      </div>
    </nav>
  );
};

export default Header;

