import React, { useState } from "react";

interface PdfUploadFormProps {
  onSubmit: (file: File | null) => void;
  onCancel: () => void;
}

const PdfUploadForm: React.FC<PdfUploadFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setPdfFile(file);
      } else {
        alert("Please select a valid PDF file.");
        setPdfFile(null);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pdfFile) {
      const formData = new FormData();
      formData.append("file", pdfFile);

      try {
        const response = await fetch("http://localhost:8080/pdf/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          alert("PDF uploaded successfully!");
        } else {
          alert("Failed to upload PDF.");
        }
      } catch (error) {
        console.error("Error uploading PDF:", error);
        alert("Failed to upload PDF. Please try again.");
      }
    } else {
      alert("No PDF file selected.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PdfUploadForm;
