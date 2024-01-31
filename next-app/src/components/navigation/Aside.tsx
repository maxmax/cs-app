"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

interface LinkItem {
  href: string;
  label: string;
}

interface AsideNavigationProps {
  links: LinkItem[];
}

const AsideNavigation: React.FC<AsideNavigationProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {links.map((item: LinkItem) => (
          <li key={item.href} className={`mb-2 ${pathname === item.href ? 'bg-gray-300 rounded-md' : ''}`}>
            <Link href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 rounded-md">
							{item.label}
            </Link>
          </li>
				))}
      </ul>
    </nav>
  );
};

export default AsideNavigation;
