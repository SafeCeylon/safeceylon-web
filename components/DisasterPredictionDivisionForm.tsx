import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DisasterType = "flood" | "landslide" | "hurricane";

export interface DisasterFormData {
  name: string;
  code: string;
  type: DisasterType;
}

type DisasterFormProps = {
  name: string;
  code: string;
  onSubmit: (data: DisasterFormData) => void;
  onCancel: () => void;
};

const DisasterForm: React.FC<DisasterFormProps> = ({
  name,
  code,
  onSubmit,
  onCancel,
}) => {
  const [disasterType, setDisasterType] = useState<DisasterType | null>(null);

  const handleSubmit = () => {
    if (disasterType) {
      onSubmit({ name, code, type: disasterType });
    } else {
      alert("Please select a disaster type.");
    }
  };

  return (
    <div className="absolute p-4 bg-white shadow-lg rounded-lg">
      <h3 className="mb-2 font-bold">Add Disaster to DSD</h3>
      <p>
        <strong>DSD Name:</strong> {name}
      </p>
      <p>
        <strong>DSD Code:</strong> {code}
      </p>

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
