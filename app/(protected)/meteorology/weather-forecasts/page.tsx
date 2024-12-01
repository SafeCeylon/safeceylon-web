"use client";

import React, { useState } from "react";
import RequestCard from "@/components/RequestCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import GoogleMaps from "@/components/GoogleMaps_withSearch";

import Link from "next/link";

import Image from "next/image";
import add_icon from "@/public/assets/add_icon.svg";
import InputForm from "@/components/PublicWeatherInputForm";
import PdfUploadForm from "@/components/PdfUploadForm";
import api from "@/utils/api";

export default function Admin() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to handle form submission
  const handleFormSubmit = async (formData: {
    date: string;
    time: string;
    description: string;
  }) => {
    try {
      const response = await api.post("/inputform/submit", formData); // Send POST request
      console.log("Backend response:", response.data);
      alert("Form submitted successfully!");
      setIsFormVisible(false); // Close the form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  // Function to handle form cancellation
  const handleFormCancel = () => {
    setIsFormVisible(false); // Close the form without submitting
  };

//--------------------------- PDF Form-------------------------------

  const [isPdfFormVisible, setIsPdfFormVisible] = useState(false);

  // Function to handle PDF form submission
  const handlePdfFormSubmit = async (file: File | null) => {
    if (!file) {
      alert("No file selected!");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await api.post("/pdf/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("PDF Upload Response:", response.data);
      alert("PDF uploaded successfully!");
      setIsPdfFormVisible(false); // Close the form after submission
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF. Please try again.");
    }
  };
  

  // Function to handle PDF form cancellation
  const handlePdfFormCancel = () => {
    setIsPdfFormVisible(false); // Close the form without submitting
  };

  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-2">
          <div className="w-full h-20 flex-shrink-0 flex flex-row">
            {/* Public Weather Button */}
            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
              onClick={() => setIsFormVisible(true)} // Show the form when clicked
            >
              <Image
                src={add_icon}
                alt="add_icon"
                className="h-[18px] w-auto pr-2"
              />
              Public Weather
            </Button>

            {/* Other Buttons */}
            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
              onClick={() => setIsFormVisible(true)}
            >
              <Image
                src={add_icon}
                alt="add_icon"
                className="h-[18px] w-auto pr-2"
              />
              Marine Weather
            </Button>

            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
              onClick={() => setIsFormVisible(true)}
            >
              <Image
                src={add_icon}
                alt="add_icon"
                className="h-[18px] w-auto pr-2"
              />
              City Forecasts
            </Button>

            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
              onClick={() => setIsPdfFormVisible(true)}
            >
              <Image
                src={add_icon}
                alt="add_icon"
                className="h-[18px] w-auto pr-2"
              />
              9 Day Forecasts
            </Button>
          </div>

          {/* Google Maps Section */}
          <div className="h-[90%]">
            <GoogleMaps />
          </div>
        </div>
      </div>

      {/* Conditionally render the InputForm */}
      {isFormVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <InputForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {isPdfFormVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <PdfUploadForm
              onSubmit={handlePdfFormSubmit}
              onCancel={handlePdfFormCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
