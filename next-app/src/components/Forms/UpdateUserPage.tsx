"use client"
import React, { useState, useEffect, FC } from 'react';
import { getUser, deleteUser, updateUser } from '@/lib/users';
import { UserDataProps } from '@/lib/users/types';
import UpdateUserForm from '@/components/Forms/UpdateUserForm';

interface UpdateUserProps {
  id: number | string;
  apiToken: string;
}

const UpdateUserPage: FC<UpdateUserProps> = ({ id, apiToken }) => {
  const [currentUser, setCurrentUser] = useState<UserDataProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(id, apiToken);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [id, apiToken]);

  const updateUserForm = async (userData: UserDataProps) => {
    try {
      await updateUser(userData, apiToken);
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="pt-8">
      {currentUser?.id &&
        <UpdateUserForm
          user={currentUser as UserDataProps}
          updateUserForm={updateUserForm}
        />
      }
    </div>
  );
};

export default UpdateUserPage;
