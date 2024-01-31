"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

interface LinkItem {
  href: string;
  label: string;
}

interface MainNavigationProps {
  links: LinkItem[];
}

const MainNavigation: React.FC<MainNavigationProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex">
        {links.map((item: LinkItem) => (
          <li key={item.href} className={`mr-2`}>
            <Link 
              href={item.href} 
              className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href ? 'bg-gray-700 rounded-md' : ''}`}
            >
							{item.label}
            </Link>
          </li>
				))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
