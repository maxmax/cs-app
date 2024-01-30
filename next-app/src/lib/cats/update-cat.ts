'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UpdateCatDataProps, CatDataProps } from './types';

export async function updateCat(catData: UpdateCatDataProps): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(catData),
  });

  if (!res.ok) {
    throw new Error('Failed to create a cat');
  }

  // We have the option to enhance the functionality of this function,
  // such as returning data for the client or transforming it into a standalone function.
  // However, considering that the entire project serves as a demonstration, we will keep it as is for now.
  revalidatePath('/cats');
  // return res.json();
}
