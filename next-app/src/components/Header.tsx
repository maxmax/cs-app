import React from 'react';
import Link from '@/components/Link';
import UserMenu from '@/components/UserMenu';

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-semibold">
          CatsApp
        </Link>
        <div className="lg:flex space-x-4">
          <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Home
          </a>
          <a href="/cats" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Cats
          </a>
          <a href="/protected" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Protected
          </a>
        </div>
        <div className="relative ml-3">
          {/* Auth user */}
          <UserMenu imgUrl={'https://upload.wikimedia.org/wikipedia/commons/3/35/Maine_coon_profile.jpg'} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
