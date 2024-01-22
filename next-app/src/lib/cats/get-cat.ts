'use server'
export async function getCat(slug: string) {
  const res = await fetch(`http://localhost:3003/cats/${slug}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
