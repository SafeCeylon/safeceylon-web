"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CustomFileUploadProps {
  onFileSelect?: (file: File | null) => void; // Callback for parent components
}

const CustomFileUpload = ({ onFileSelect }: CustomFileUploadProps) => {
  const [fileName, setFileName] = useState("No file chosen");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("File size exceeds 2MB limit.");
        setFileName("No file chosen");
        onFileSelect?.(null);
        return;
      }

      // Validate file type (image only)
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Only JPG, JPEG, or PNG files are allowed.");
        setFileName("No file chosen");
        onFileSelect?.(null);
        return;
      }

      // Clear previous error and set the file
      setErrorMessage("");
      setFileName(file.name);
      onFileSelect?.(file);
    } else {
      setFileName("No file chosen");
      onFileSelect?.(null);
    }
  };

  return (
    <div className="relative">
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png"
      />
      <label
        htmlFor="file-upload"
        className="block cursor-pointer py-2 px-4 text-center rounded-md shadow-md text-gray-500 text-lg bg-gray-50 hover:bg-gray-100 hover:shadow-lg focus:ring focus:ring-green-500"
      >
        Upload
      </label>
      <span className="block mt-2 text-gray-500 text-sm">{fileName}</span>
      {errorMessage && (
        <p className="mt-1 text-red-500 text-xs">{errorMessage}</p>
      )}
      <span className="text-sm text-gray-400">Maximum Size: 2MB</span>
    </div>
  );
};

export default CustomFileUpload;
