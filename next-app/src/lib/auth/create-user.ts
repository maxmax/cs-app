'use server'

interface CreateUserDataProps {
  username: string;
  email: string;
  password: string;
}

interface UserDataProps {
  id: number;
  username: string;
  email: string;
  role: string;
}

export async function createUser(userData: CreateUserDataProps): Promise<UserDataProps> {
  const res = await fetch(`http://localhost:3003/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error('Failed to create a user');
  }

  const responseData = await res.json();
  
  return responseData;
}
