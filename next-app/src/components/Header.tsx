import React, { FC } from "react"
import Link from '@/components/Link';
import UserHead from '@/components/UserHead';

const Header: FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-semibold">
          CatsApp
        </Link>
        <div className="lg:flex space-x-4">
          <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Home
          </Link>
          <Link href="/cats" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Cats
          </Link>
          <Link href="/protected" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Protected
          </Link>
        </div>
        <div className="relative ml-3">
          <UserHead />
        </div>
      </div>
    </nav>
  );
};

export default Header;
