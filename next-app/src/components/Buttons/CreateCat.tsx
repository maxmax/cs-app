"use client"
import React, { useState } from 'react';
import CreateCatForm from '@/components/Forms/CreateCatForm';

const CreateCat: React.FC = () => {
  const [isCreateCatFormOpen, setCreateCatFormOpen] = useState(false);

  const openCreateCatForm = () => {
    setCreateCatFormOpen(true);
  };

  const closeCreateCatForm = () => {
    setCreateCatFormOpen(false);
  };

  return (
    <div>
      <button
        onClick={openCreateCatForm}
        className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
      >
        Create Cat
      </button>

      {isCreateCatFormOpen && <CreateCatForm onClose={closeCreateCatForm} />}
    </div>
  );
};

export default CreateCat;
