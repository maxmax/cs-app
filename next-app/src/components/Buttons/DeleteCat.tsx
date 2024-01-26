"use client"
import React, { FC } from 'react';
import { useClientSession } from '@/lib/auth';
import { deleteCat } from '@/lib/cats';

interface DeleteCatProps {
  id: number;
}

const DeleteCat: FC<DeleteCatProps> = ({ id }) => {

  const session  = useClientSession();

  const deleteCatForm = async () => await deleteCat(id);

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <button
        onClick={deleteCatForm}
        className="mt-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </>
  );
};

export default DeleteCat;
