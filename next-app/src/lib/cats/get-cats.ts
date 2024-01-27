'use server'
export async function getCats() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cats`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
