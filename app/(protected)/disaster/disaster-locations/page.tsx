"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GoogleMaps_forDisasterLocations from "@/components/GoogleMaps_forDisasterLocations";
import Image from "next/image";
import add_icon from "@/public/assets/add_icon.svg";
import DisasterForm, {
  DisasterFormData,
} from "@/components/DisasterLocationForm";
import axios from "axios";

export default function Admin() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [editingDisaster, setEditingDisaster] = useState<{
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    radius: number;
  } | null>(null);

  const [disasters, setDisasters] = useState<
    {
      id: string;
      latitude: number;
      longitude: number;
      type: string;
      radius: number;
    }[]
  >([]);

  const fetchDisasters = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/disasters");
      setDisasters(response.data);
    } catch (error) {
      console.error("Error fetching disasters:", error);
    }
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  const handleMapClick = (latitude: number, longitude: number) => {
    if (isAdding) {
      setSelectedLocation({ latitude, longitude });
    }
  };

  const handleAddDisaster = () => {
    setIsAdding(true);
    setSelectedLocation(null);
  };

  const handleEditDisaster = (disaster: {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    radius: number;
  }) => {
    setIsEditing(true);
    setEditingDisaster(disaster);
    setSelectedLocation({
      latitude: disaster.latitude,
      longitude: disaster.longitude,
    });
  };

  const handleDeleteDisaster = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/disasters/${id}`);
      setDisasters(disasters.filter((disaster) => disaster.id !== id));
    } catch (error) {
      console.error("Error deleting disaster:", error);
    }
  };

  const handleFormSubmit = (data: DisasterFormData) => {
    if (isEditing && editingDisaster) {
      axios
        .put(`http://localhost:8080/api/disasters/${editingDisaster.id}`, data)
        .then((response) => {
          setDisasters(
            disasters.map((d) =>
              d.id === editingDisaster.id ? response.data : d
            )
          );
        })
        .catch((error) => console.error("Error updating disaster:", error));
    } else {
      axios
        .post("http://localhost:8080/api/disasters", data)
        .then((response) => setDisasters([...disasters, response.data]))
        .catch((error) => console.error("Error adding disaster:", error));
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
              onClick={handleAddDisaster}
            >
              <Image
                src={add_icon}
                alt="Add"
                className="h-[18px] w-auto pr-2"
              />
              Add Disaster Location
            </Button>
          </div>

          <div className="relative h-[90%]">
            {isAdding && (
              <div className="absolute top-4 left-4 z-10 bg-blue-100 text-blue-800 p-2 rounded-md shadow-md">
                Click on the map to select a location for the disaster.
              </div>
            )}

            <GoogleMaps_forDisasterLocations
              onClick={handleMapClick}
              disasters={disasters}
              onEdit={handleEditDisaster}
              onDelete={handleDeleteDisaster}
            />

            {(isAdding || isEditing) && selectedLocation && (
              <div
                className="absolute bg-white shadow-lg rounded-lg p-4"
                style={{
                  top: `calc(50% + ${selectedLocation.latitude * 0.1}px)`,
                  left: `calc(50% + ${selectedLocation.longitude * 0.1}px)`,
                }}
              >
                <DisasterForm
                  latitude={selectedLocation.latitude}
                  longitude={selectedLocation.longitude}
                  type={editingDisaster?.type}
                  radius={editingDisaster?.radius}
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
