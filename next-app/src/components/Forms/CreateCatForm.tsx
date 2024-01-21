"use client"
import React, { FC, useState, ChangeEvent } from 'react';
import { createCat } from '@/lib/cats';

interface CreateCatFormProps {
  onClose: () => void;
}

const defaultAttributes = {
	name: '',
  breed: '',
  imgUrl: '',
  content: '',
  age: 0,
};

const CreateCatForm: FC<CreateCatFormProps> = ({ onClose }) => {
  const [attributes, setAttributes] = useState(defaultAttributes);

  const handleChangeAttributes = (e: ChangeEvent<HTMLInputElement>) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createCat({
      ...attributes,
      age: Number(attributes.age)
    });

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
      <div className="bg-white p-8 max-w-md w-full rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Cat</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(attributes).map(([field, value]) => (
            field !== 'date' && (
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
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Create Cat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCatForm;
