'use server'
import { revalidatePath } from 'next/cache';

export async function deleteUser(id: number, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  revalidatePath('/office');
}
