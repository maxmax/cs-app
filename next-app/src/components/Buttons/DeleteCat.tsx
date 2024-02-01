"use client"
import React, { FC } from 'react';
import { useClientSession } from '@/lib/auth';
import { deleteCat } from '@/lib/cats';

interface DeleteCatProps {
  id: number;
}

const DeleteCat: FC<DeleteCatProps> = ({ id }) => {

  const session  = useClientSession();

  if (!session?.user && !session?.apiToken) {
    return null;
  }

  const deleteCatForm = async () => await deleteCat(id, session.apiToken);

  return (
    <>
      <button
        onClick={deleteCatForm}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Delete
      </button>
    </>
  );
};

export default DeleteCat;
