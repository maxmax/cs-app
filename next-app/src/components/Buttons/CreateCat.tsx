"use client"
import { useState, FC } from 'react';
import { useClientSession } from '@/lib/auth';
import Dialog from '@/components/Dialog';
import CreateCatForm from '@/components/Forms/CreateCatForm';

const CreateCat: FC = () => {

  const session  = useClientSession();

  const [isCreateCatFormOpen, setCreateCatFormOpen] = useState(false);

  const openCreateCatForm = () => {
    setCreateCatFormOpen(true);
  };

  const closeCreateCatForm = () => {
    setCreateCatFormOpen(false);
  };

  if (!session?.user?.id && !session?.apiToken) {
    return null;
  }


  return (
    <>
      <button
        onClick={openCreateCatForm}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
      >
        Create Cat
      </button>
      {isCreateCatFormOpen && (
        <Dialog onClose={closeCreateCatForm} title={'Create Cat'}>
          <CreateCatForm onClose={closeCreateCatForm} apiToken={session?.apiToken} />
        </Dialog>
      )}
    </>
  );
};

export default CreateCat;
