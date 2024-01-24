import { getServerSession } from "next-auth/next"
import type { NextRequest } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from '@/components/Link';

export default async function Home(req: NextRequest): Promise<any> {
  const session = await getServerSession(authOptions);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Welcome to app</h1>
        <div className="mt-5 items-center justify-center gap-x-6">
          {
            session !== null
              ? <>
                  <h1 className='leading-loose text-[2rem] font-extrabold text-accent'>
                    Hi {session?.user.name}!
                  </h1>
                  <Link href="/protected" className="text-sm font-semibold text-gray-900">
                    Show more to protected page <span aria-hidden="true">&rarr;</span>
                  </Link>
                </>
              :
                <>
                  <p className="mt-3 mb-6 text-base leading-7 text-gray-600">Hello stranger, some features of this application require authorization.</p>
                  <Link href="/login" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign in
                  </Link>
                </>
          }
        </div>
      </div>
    </main>
  );
}
