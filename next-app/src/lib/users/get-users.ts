'use server'
export async function getUsers(token: string) {
  const res = await fetch(`http://localhost:3003/users`, {
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
