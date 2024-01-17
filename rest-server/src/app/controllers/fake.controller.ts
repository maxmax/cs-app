import { Request, Response } from 'express';
import casual from 'casual';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  email: string;
}

const generateUser = (index: number): User => {
  // Generation of random data for the user
  const firstName = casual.first_name;
  const lastName = casual.last_name;
  const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
  const age = casual.integer(18, 65);
  const email = casual.email;

  return {
    id: index + 1,
    firstName,
    lastName,
    username,
    age,
    email,
  };
};

export const generateUsers = (req: Request, res: Response): void => {
  const { count = 5000 } = req.query;

  const users: User[] = Array.from({ length: Number(count) }, (_, index) => generateUser(index));

  res.json(users);
};
