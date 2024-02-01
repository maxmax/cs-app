'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteCat(id: number, token: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cats/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to create a cat');
  }

  revalidatePath('/cats');
  redirect(`/cats`);
}
