'use server'
export async function getCats(query: string, currentPage: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cats?page=${currentPage}&breed=${query}`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
