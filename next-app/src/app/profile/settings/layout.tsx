import React from 'react';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex min-h-screen mx-auto max-w-2xl lg:max-w-none px-4 sm:px-6 lg:px-8">
      <aside className="w-1/4 bg-gray-200 p-4">
        {/* For example, menu and other elements */}
      </aside>
      <div className="flex-1 mx-auto max-w-2xl py-8 sm:py-8 lg:max-w-none px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
