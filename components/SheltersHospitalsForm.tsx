import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FormData {
  latitude: number;
  longitude: number;
  type: string;
  name?: string;
  contact?: string;
  capacity?: number;
}

type FormProps = {
  latitude: number;
  longitude: number;
  type?: string;
  name?: string;
  contact?: string;
  capacity?: number;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

const SheltersHospitalsForm: React.FC<FormProps> = ({
  latitude,
  longitude,
  type = "",
  name = "",
  contact = "",
  capacity = 0,
  onSubmit,
  onCancel,
}) => {
  const [formType, setFormType] = useState(type);
  const [formName, setFormName] = useState(name);
  const [formContact, setFormContact] = useState(contact);
  const [formCapacity, setFormCapacity] = useState(capacity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      latitude,
      longitude,
      type: formType,
      name: formName,
      contact: formContact,
      capacity: formCapacity,
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Select onValueChange={setFormType} value={formType}>
        <SelectTrigger>
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="shelter">Shelter</SelectItem>
          <SelectItem value="hospital">Hospital</SelectItem>
        </SelectContent>
      </Select>

      <input
        type="text"
        placeholder="Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        className="border rounded px-4 py-2"
      />
      <input
        type="text"
        placeholder="Contact"
        value={formContact}
        onChange={(e) => setFormContact(e.target.value)}
        className="border rounded px-4 py-2"
      />
      <input
        type="number"
        placeholder="Capacity"
        value={formCapacity}
        onChange={(e) => setFormCapacity(Number(e.target.value))}
        className="border rounded px-4 py-2"
      />

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default SheltersHospitalsForm;
