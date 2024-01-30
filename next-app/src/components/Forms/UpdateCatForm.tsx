"use client"
import React, { FC, useState, ChangeEvent } from 'react';
import { CatDataProps } from '@/lib/cats/types';
import { updateCat } from '@/lib/cats';
import FormControl from '@/components/Forms/FormControl';

interface CreateCatFormProps {
  onClose: () => void;
  cat: CatDataProps;
}

const UpdateCatForm: FC<CreateCatFormProps> = ({ onClose, cat }) => {
  const [attributes, setAttributes] = useState(cat);

  const handleChangeAttributes = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateCat({
      ...attributes,
      age: Number(attributes.age)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(attributes).map(([field, value]) => (
        field !== 'id' && field !== 'createdAt' && field !== 'age' && (
          <FormControl
            key={field}
            className={'mb-4'}
            label={field}
            id={field}
            name={field}
            value={value}
            onChange={handleChangeAttributes}
            required={true}
          />
        )
      ))}
      <FormControl
        className={'mb-4'}
        label={'age'}
        id={'age'}
        name={'age'}
        value={attributes['age']}
        onChange={handleChangeAttributes}
        required={true}
        type={'number'}
      />
      <div className="flex justify-end">
        <button type="button" className="mr-5 text-gray-500" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Update Cat
        </button>
      </div>
    </form>
  );
};

export default UpdateCatForm;
