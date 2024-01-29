"use client"
import React, { useState, FC } from 'react';
import { getUser, deleteUser, updateUser } from '@/lib/users';
import { UserDataProps } from '@/lib/users/types';
import Dialog from '@/components/Dialog';
import UpdateUserForm from '@/components/Forms/UpdateUserForm';

interface UpdateUserProps {
  id: number;
  apiToken: string;
}

const UpdateUser: FC<UpdateUserProps> = ({ id, apiToken }) => {
  const [currentUser, setCurrentUser] = useState<UserDataProps | {}>({});
  const [isUpdateUserFormOpen, setUpdateUserFormOpen] = useState<boolean>(false);

  const openUpdateUserForm = async () => {
    const user = await getUser(id, apiToken);
    if (user?.id) {
      setCurrentUser(user);
      setUpdateUserFormOpen(true);
    }
  };

  const closeUpdateUserForm = () => {
    setUpdateUserFormOpen(false);
  };

  const updateUserForm = async (userData: UserDataProps) => {
    await updateUser(userData, apiToken);
  };

  const deleteUserForm = async () => {
    await deleteUser(id, apiToken);
  };

  return (
    <>
      <button
        onClick={openUpdateUserForm}
        className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
      >
        Settings
      </button>

      {isUpdateUserFormOpen && (
        <Dialog onClose={closeUpdateUserForm} title={'Update User'}>
          <UpdateUserForm
            onClose={closeUpdateUserForm}
            user={currentUser as UserDataProps}
            deleteUserForm={deleteUserForm}
            updateUserForm={updateUserForm}
          />
        </Dialog>
      )}
    </>
  );
};

export default UpdateUser;
