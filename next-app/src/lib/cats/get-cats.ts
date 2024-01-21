'use server'
export async function getCats() {
  const res = await fetch(`http://localhost:3003/cats`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
