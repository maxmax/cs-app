'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteCat(id: number): Promise<void> {
  const res = await fetch(`http://localhost:3003/cats/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to create a cat');
  }

  revalidatePath('/cats');
  redirect(`/cats`);
}
