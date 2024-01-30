"use client"
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { UserDataProps } from '@/lib/users/types';
import FormControl from '@/components/Forms/FormControl';

interface UpdateUserFormProps {
  user: UserDataProps;
  onClose?: () => void;
  deleteUserForm?: () => Promise<void>;
  updateUserForm: (userData: UserDataProps) => Promise<void>;
}

const UpdateUserForm: FC<UpdateUserFormProps> = ({ user, onClose, deleteUserForm, updateUserForm }) => {
  const initialUserState: UserDataProps = {
    id: 0,
    role: '',
    company: '',
    imgUrl: '',
    contacts: '',
    about: '',
    ...user,
  };

  const [attributes, setAttributes] = useState<UserDataProps>(initialUserState);

  const handleChangeAttributes = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [name]: value,
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
          !['id', 'password', 'role', 'company', 'imgUrl', 'contacts', 'about'].includes(field) && (
            <FormControl
              key={field}
              className={'mb-4'}
              label={field}
              id={field}
              name={field}
              value={value}
              onChange={handleChangeAttributes}
              // required
            />
          )
        ))}
      </div>
      <FormControl
        className={'mb-4'}
        label={'Img url'}
        id={'imgUrl'}
        name={'imgUrl'}
        value={attributes['imgUrl']}
        onChange={handleChangeAttributes}
      />
      {['company', 'contacts', 'about'].map((field) => (
        <FormControl
          key={field}
          className={'mb-4'}
          label={field}
          id={field}
          name={field}
          value={attributes[field as keyof typeof attributes]}
          onChange={handleChangeAttributes}
          type={field === 'contacts' || field === 'about' ? 'textarea' : 'text'}
        />
      ))}
      <div className="flex justify-end pt-5">
        {!!onClose && (
          <button type="button" className="mr-5 text-gray-500" onClick={onClose}>
            Cancel
          </button>
        )}
        {!!deleteUserForm && (
          <button
            type="button"
            className="mr-5 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={deleteUserForm}
          >
            Delete User
          </button>
        )}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateUserForm;