'use server'
export async function getUser(id: number | string, token: string) {
  const res = await fetch(`http://localhost:3003/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
