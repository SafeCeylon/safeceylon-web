import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

export interface DisasterFormData {
  latitude: number;
  longitude: number;
  type: string;
  radius: number; // New field for radius
}

type DisasterFormProps = {
  latitude: number;
  longitude: number;
  onSubmit: (data: DisasterFormData) => void;
  onCancel: () => void;
};

const saveDisasterData = async (data: {
  latitude: number;
  longitude: number;
  type: string;
  radius: number;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/disasters",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Data saved successfully:", response.data);
  } catch (error) {
    console.log("Error saving disaster data:", error);
  }
};

const DisasterForm: React.FC<DisasterFormProps> = ({
  latitude: latitude,
  longitude: longitude,
  onSubmit,
  onCancel,
}) => {
  const [type, setType] = useState<string | null>(null);
  const [radius, setRadius] = useState<number | null>(null);

  const handleSubmit = () => {
    if (type && radius) {
      const reportedAt = new Date().toISOString();
      const disasterData = {
        latitude,
        longitude,
        type,
        radius,
        reportedAt,
      };
      saveDisasterData(disasterData); // Save data to the backend
      onSubmit(disasterData);
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <div className="absolute p-4 bg-white shadow-lg rounded-lg">
      <h3 className="mb-2 font-bold">Add Disaster Location</h3>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>

      <Select onValueChange={(value) => setType(value)}>
        <SelectTrigger className="w-full mt-2">
          <SelectValue placeholder="Select Disaster Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="flood">Flood</SelectItem>
          <SelectItem value="landslide">Landslide</SelectItem>
          <SelectItem value="hurricane">Hurricane</SelectItem>
        </SelectContent>
      </Select>

      <input
        type="number"
        placeholder="Enter radius (meters)"
        className="mt-2 p-2 border rounded w-full"
        onChange={(e) => setRadius(Number(e.target.value))}
      />

      <Button className="mt-4 w-full" onClick={handleSubmit}>
        Submit
      </Button>
      <Button className="mt-2 w-full" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default DisasterForm;
