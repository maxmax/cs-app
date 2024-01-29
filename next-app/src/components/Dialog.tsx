"use client"
import { FC, ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DialogProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

const Dialog: FC<DialogProps> = ({ title, children, onClose }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
      <div className="bg-white p-8 max-w-md w-full rounded-md shadow-md max-h-[88vh] overflow-y-auto text-left">
        <div className="relative">
          <button
            className="absolute right-0 p-1 text-gray-500 hover:text-gray-700"
            onClick={() => onClose()}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
