'use server'
import { notFound } from 'next/navigation';

export async function getUserSlug(slug: number | string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/public/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    // throw new Error('Failed to get user fetch data')
    notFound();
  }

  return res.json()
}
