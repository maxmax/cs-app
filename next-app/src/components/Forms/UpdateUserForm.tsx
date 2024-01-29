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
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(attributes).map(([field, value]) => (
          field !== 'id' && field !== 'password' && field !== 'role' && field !== 'company' && field !== 'imgUrl' && field !== 'contacts' && field !== 'about' && (
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
              />
            </div>
          )
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor={'imgUrl'} className="block text-sm font-medium text-gray-700">
          {'Img url'}
        </label>
        <input
          type="text"
          id={'imgUrl'}
          name={'imgUrl'}
          value={attributes['imgUrl']}
          onChange={handleChangeAttributes}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor={'company'} className="block text-sm font-medium text-gray-700">
          {'Company'}
        </label>
        <input
          type="text"
          id={'company'}
          name={'company'}
          value={attributes['company']}
          onChange={handleChangeAttributes}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor={'contacts'} className="block text-sm font-medium text-gray-700">
          {'Contacts'}
        </label>
        <input
          type="text"
          id={'contacts'}
          name={'contacts'}
          value={attributes['contacts']}
          onChange={handleChangeAttributes}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor={'about'} className="block text-sm font-medium text-gray-700">
          {'About'}
        </label>
        <input
          type="text"
          id={'about'}
          name={'about'}
          value={attributes['about']}
          onChange={handleChangeAttributes}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="flex justify-end pt-5">
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
  );
};

export default UpdateUserForm;
