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
  const [currentUser, setCurrentUser] = useState<UserDataProps | {}>({});

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser(id, apiToken);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const closeUpdateUserForm = () => {
    setUpdateUserFormOpen(false);
  };

  const updateUserForm = async (userData: UserDataProps) => {
    await updateUser(userData, apiToken);
  };

  // const deleteUserForm = async () => {
  //  await deleteUser(id, apiToken);
  // };

  return (
    <div className="pt-8">
      {currentUser?.id &&
        <UpdateUserForm
          user={currentUser as UserDataProps}
          // deleteUserForm={deleteUserForm}
          updateUserForm={updateUserForm}
        />
      }
    </div>
  );
};

export default UpdateUserPage;
