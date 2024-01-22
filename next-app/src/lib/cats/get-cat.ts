'use server'
import { notFound } from 'next/navigation';

export async function getCat(slug: string) {
  const res = await fetch(`http://localhost:3003/cats/${slug}`)

  if (!res.ok) {
    // throw new Error('Failed to fetch data')
    notFound();
  }

  return res.json()
}
