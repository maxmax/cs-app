'use server'
import { revalidatePath } from 'next/cache';
import { UpdateUserDataProps } from '@/lib/users/types';

export async function updateUser(userData: UpdateUserDataProps, token: string) {
  const res = await fetch(`http://localhost:3003/users/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  revalidatePath('/office');
}
