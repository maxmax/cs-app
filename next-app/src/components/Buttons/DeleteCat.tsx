"use client"
import React, { FC } from 'react';
import { deleteCat } from '@/lib/cats';

interface DeleteCatProps {
  id: number;
}

const DeleteCat: FC<DeleteCatProps> = ({ id }) => {
  const deleteCatForm = async () => await deleteCat(id);

  return (
    <div>
      <button
        onClick={deleteCatForm}
        className="mt-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteCat;
