"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GoogleMaps_forHospitalShelters from "@/components/GoogleMaps_forHospitalShelters";
import Image from "next/image";
import add_icon from "@/public/assets/add_icon.svg";
import SheltersHospitalsForm, {
  FormData,
} from "@/components/SheltersHospitalsForm";
import axios from "axios";

export default function SheltersHospitals() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [editingEntry, setEditingEntry] = useState<{
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    capacity?: number;
    name?: string;
    contact?: string;
  } | null>(null);

  const [entries, setEntries] = useState<
    {
      id: string;
      latitude: number;
      longitude: number;
      type: string;
      capacity?: number;
      name?: string;
      contact?: string;
    }[]
  >([]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/shelters-hospitals"
      );
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleMapClick = (latitude: number, longitude: number) => {
    if (isAdding) {
      setSelectedLocation({ latitude, longitude });
    }
  };

  const handleAddEntry = () => {
    setIsAdding(true);
    setSelectedLocation(null);
  };

  const handleEditEntry = (entry: {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    capacity?: number;
    name?: string;
    contact?: string;
  }) => {
    setIsEditing(true);
    setEditingEntry(entry);
    setSelectedLocation({
      latitude: entry.latitude,
      longitude: entry.longitude,
    });
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/shelters-hospitals/${id}`);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleFormSubmit = (data: FormData) => {
    if (isEditing && editingEntry) {
      axios
        .put(
          `http://localhost:8080/api/shelters-hospitals/${editingEntry.id}`,
          data
        )
        .then((response) => {
          setEntries(
            entries.map((e) => (e.id === editingEntry.id ? response.data : e))
          );
        })
        .catch((error) => console.error("Error updating entry:", error));
    } else {
      axios
        .post("http://localhost:8080/api/shelters-hospitals", data)
        .then((response) => setEntries([...entries, response.data]))
        .catch((error) => console.error("Error adding entry:", error));
    }
    setIsAdding(false);
    setIsEditing(false);
    setSelectedLocation(null);
  };

  const handleFormCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setSelectedLocation(null);
  };

  return (
    <div className="px-8 md:px-24 flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-0">
          <div className="w-full h-20 flex-shrink-0 flex flex-row justify-between items-center">
            <Button
              variant="outline"
              className="ml-4 rounded-full shadow-md shadow-gray-400"
              onClick={handleAddEntry}
            >
              <Image
                src={add_icon}
                alt="Add"
                className="h-[18px] w-auto pr-2"
              />
              Add Shelter/Hospital
            </Button>
          </div>

          <div className="relative h-[90%]">
            {isAdding && (
              <div className="absolute top-4 left-4 z-10 bg-blue-100 text-blue-800 p-2 rounded-md shadow-md">
                Click on the map to select a location.
              </div>
            )}

            <GoogleMaps_forHospitalShelters
              onClick={handleMapClick}
              entries={entries}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
            />

            {(isAdding || isEditing) && selectedLocation && (
              <div
                className="absolute bg-white shadow-lg rounded-lg p-4"
                style={{
                  top: `calc(10% + ${selectedLocation.latitude * 0.05}px)`,
                  left: `calc(70% + ${selectedLocation.longitude * 0.05}px)`,
                }}
              >
                <SheltersHospitalsForm
                  latitude={selectedLocation.latitude}
                  longitude={selectedLocation.longitude}
                  type={editingEntry?.type}
                  capacity={editingEntry?.capacity}
                  name={editingEntry?.name}
                  contact={editingEntry?.contact}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
