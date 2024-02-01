"use client"
import { useState, FC } from 'react';
import { useClientSession } from '@/lib/auth';
import { getCat } from '@/lib/cats';
import { CatDataProps } from '@/lib/cats/types';
import Dialog from '@/components/Dialog';
import UpdateCatForm from '@/components/Forms/UpdateCatForm';

interface UpdateCatProps {
  id: number;
}

const UpdateCat: FC<UpdateCatProps> = ({ id }) => {
  const [currentCat, setCurrentCat] = useState<CatDataProps | {}>({});
  const [isCreateCatFormOpen, setCreateCatFormOpen] = useState(false);

  const session  = useClientSession();

  const openUpdateCatForm = async () => {
    const cat = await getCat(id);
    if (cat?.id) {
      setCurrentCat(cat);
      setCreateCatFormOpen(true);
    }
  };

  const closeUpdateCatForm = () => {
    setCreateCatFormOpen(false);
  };

  if (!session?.user && !session?.apiToken) {
    return null;
  }

  return (
    <>
      <button
        onClick={openUpdateCatForm}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800"
      >
        Update
      </button>
      {isCreateCatFormOpen && currentCat && (
        <Dialog onClose={closeUpdateCatForm} title={'Update Cat'}>
          <UpdateCatForm onClose={closeUpdateCatForm} cat={currentCat as CatDataProps} apiToken={session?.apiToken}/>
        </Dialog>
      )}
    </>
  );
};

export default UpdateCat;
