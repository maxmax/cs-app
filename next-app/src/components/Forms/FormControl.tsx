"use client"
import React, { ChangeEvent } from 'react';

interface FormControlProps {
  className?: string;
  label: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  type?: string;
}

const FormControl: React.FC<FormControlProps> = ({
  className,
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  type = 'text',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        required={required}
      />
    </div>
  );
};

export default FormControl;
