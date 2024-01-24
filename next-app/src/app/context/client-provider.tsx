'use client'
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react"

export default function Provider ({
  children,
  session
}: {
  children: ReactNode
  session: any
}): ReactNode {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
