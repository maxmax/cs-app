'use server'
export async function getUsers(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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
