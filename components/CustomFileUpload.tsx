'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";

const CustomFileUpload = () => {
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : 'No file chosen');
  };

  return (
    <div className="relative">
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload"
        className="block cursor-pointer py-2 px-4 text-center rounded-md shadow-md shadow-gray-400 text-gray-500 text-lg hover:bg-gray-100"
      >
        Upload
      </label>
      <span className="block mt-2 text-gray-500 text-sm">
        {fileName}
      </span>

      <span className='text-sm'>
        Maximum Size 2MB
      </span>
    </div>
  );
};

export default CustomFileUpload;
