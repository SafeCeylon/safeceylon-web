// File: components/DisasterForm.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { string } from "zod";

type DisasterType = "flood" | "landslide" | "hurricane";

export interface DisasterFormData {
  lat: number;
  lng: number;
  type: DisasterType;
  // details: string;
}

type DisasterFormProps = {
  lat: number;
  lng: number;
  onSubmit: (data: DisasterFormData) => void;
  onCancel: () => void;
};

const DisasterForm: React.FC<DisasterFormProps> = ({
  lat,
  lng,
  onSubmit,
  onCancel,
}) => {
  const [disasterType, setDisasterType] = useState<DisasterType | null>(null);

  const handleSubmit = () => {
    if (disasterType) {
      onSubmit({ lat, lng, type: disasterType });
    } else {
      alert("Please select a disaster type.");
    }
  };

  return (
    <div className="absolute p-4 bg-white shadow-lg rounded-lg">
      <h3 className="mb-2 font-bold">Add Disaster Location</h3>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>

      <Select onValueChange={(value) => setDisasterType(value as DisasterType)}>
        <SelectTrigger className="w-full mt-2">
          <SelectValue placeholder="Select Disaster Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="flood">Flood</SelectItem>
          <SelectItem value="landslide">Landslide</SelectItem>
          <SelectItem value="hurricane">Hurricane</SelectItem>
        </SelectContent>
      </Select>

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
