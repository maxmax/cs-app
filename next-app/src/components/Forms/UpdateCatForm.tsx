"use client"
import React, { FC, useState, ChangeEvent } from 'react';
import { CatDataProps } from '@/lib/cats/types';
import { updateCat } from '@/lib/cats';
import FormControl from '@/components/Forms/FormControl';

interface UpdateCatFormProps {
  onClose: () => void;
  cat: CatDataProps;
}

const UpdateCatForm: FC<UpdateCatFormProps> = ({ onClose, cat }) => {
  const [attributes, setAttributes] = useState<CatDataProps>(cat);

  const handleChangeAttributes = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCat(cat.id, attributes);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(attributes).map(([field, value]) => (
        !['id', 'createdAt', 'age', 'authorId'].includes(field) && (
          <FormControl
            key={field}
            className={'mb-4'}
            label={field}
            id={field}
            name={field}
            value={value}
            onChange={handleChangeAttributes}
            required
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
