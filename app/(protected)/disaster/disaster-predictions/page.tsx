"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import GoogleMaps_forDisasterPredictions from "@/components/GoogleMaps_forDisasterPredictions";
import Image from "next/image";
import Modal from "@/components/UploadForm";
import add_icon from "@/public/assets/add_icon.svg";

const DisasterPredictions: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !fileType) {
      alert("Please select a file and specify its type!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("fileType", fileType); // Add file type to the request

    try {
      const response = await axios.post(
        "http://localhost:8080/api/fileupload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(`${fileType} uploaded successfully:`, response.data);
      setModalOpen(false);
    } catch (error) {
      console.error(`Error uploading ${fileType}:`, error);
    }
  };

  const openModal = (type: string) => {
    setFileType(type);
    setModalOpen(true);
  };

  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-0">
          <div className="w-full h-20 flex-shrink-0 flex flex-row items-center justify-between">
            <div>
              <Button
                variant="outline"
                className="ml-4 rounded-full shadow-md shadow-gray-400"
                onClick={() => openModal("Weather Report")}
              >
                <Image
                  src={add_icon}
                  alt="Logo1"
                  className="h-[18px] w-auto pr-2"
                />
                Weather Reports
              </Button>

              <Button
                variant="outline"
                className="ml-4 rounded-full shadow-md shadow-gray-400"
                onClick={() => openModal("Landslide Warning")}
              >
                <Image
                  src={add_icon}
                  alt="Logo1"
                  className="h-[18px] w-auto pr-2"
                />
                Landslide Warning
              </Button>

              <Button
                variant="outline"
                className="ml-4 rounded-full shadow-md shadow-gray-400"
                onClick={() => openModal("Flood Warning")}
              >
                <Image
                  src={add_icon}
                  alt="Logo1"
                  className="h-[18px] w-auto pr-2"
                />
                Flood Warning
              </Button>

              <Button
                variant="outline"
                className="ml-4 rounded-full shadow-md shadow-gray-400"
                onClick={() => openModal("Quality Status")}
              >
                <Image
                  src={add_icon}
                  alt="Logo1"
                  className="h-[18px] w-auto pr-2"
                />
                Quality Status
              </Button>
            </div>
          </div>

          <div className="h-[90%]">
            <GoogleMaps_forDisasterPredictions />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleUpload}
      >
        <div>
          <p className="text-lg font-semibold">Upload {fileType}</p>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </div>
      </Modal>
    </div>
  );
};

export default DisasterPredictions;
