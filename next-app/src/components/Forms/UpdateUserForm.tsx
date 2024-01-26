"use client"
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { UserDataProps } from '@/lib/users/types';

interface UpdateUserFormProps {
  user: UserDataProps;
  onClose: () => void;
  deleteUserForm: () => Promise<void>;
  updateUserForm: (userData: UserDataProps) => Promise<void>;
}

const UpdateUserForm: FC<UpdateUserFormProps> = ({ user, onClose, deleteUserForm, updateUserForm }) => {
  const [attributes, setAttributes] = useState<UserDataProps>(user);

  const handleChangeAttributes = (e: ChangeEvent<HTMLInputElement>) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateUserForm(attributes);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center text-left z-10 bg-black bg-opacity-50">
      <div className="bg-white p-8 max-w-md w-full rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Update User</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(attributes).map(([field, value]) => (
            field !== 'id' && field !== 'password' && (
              <div className="mb-4" key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={value}
                  onChange={handleChangeAttributes}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
            )
          ))}
          <div className="flex justify-end">
            <button type="button" className="mr-5 text-gray-500" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="mr-5 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
              onClick={deleteUserForm}
            >
              Delete User
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
