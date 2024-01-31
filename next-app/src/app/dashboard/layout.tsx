import React from 'react';
import AsideNavigation from '@/components/navigation/Aside';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/users', label: 'Users' },
];

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex min-h-screen mx-auto">
      <aside className="w-1/4 bg-gray-200 p-4">
        <AsideNavigation links={links} />
      </aside>
      <div className="flex-1 mx-auto max-w-2xl py-8 sm:py-8 lg:max-w-none px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}