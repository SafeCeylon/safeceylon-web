"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GoogleMaps_forDisasterLocations from "@/components/GoogleMaps_forDisasterLocations";
import Image from "next/image";
import add_icon from "@/public/assets/add_icon.svg";
import DisasterForm, {
  DisasterFormData,
} from "@/components/DisasterLocationForm";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:8080/api";

interface Disaster {
  id: string;
  latitude: number;
  longitude: number;
  type: string;
  radius: number;
  reportedAt: string;
  resolved: boolean;
  reportedBy: string;
}

interface User {
  id: string;
  latitude: number;
  longitude: number;
}

export default function Admin() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [editingDisaster, setEditingDisaster] = useState<Disaster | null>(null);

  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [filter, setFilter] = useState("all");

  const fetchDisasters = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/disasters`);
      setDisasters(response.data);
    } catch (error) {
      console.error("Error fetching disasters:", error);
      toast.error("Failed to fetch disasters.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDisasters();
    fetchUsers();
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

  const handleEditDisaster = (disaster: Disaster) => {
    setIsEditing(true);
    setEditingDisaster(disaster);
    setSelectedLocation({
      latitude: disaster.latitude,
      longitude: disaster.longitude,
    });
  };

  const handleDeleteDisaster = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/disasters/${id}`);
      setDisasters(disasters.filter((disaster) => disaster.id !== id));
      toast.success("Disaster deleted successfully.");
    } catch (error) {
      console.error("Error deleting disaster:", error);
      toast.error("Failed to delete disaster.");
    }
  };

  const handleFormSubmit = (data: DisasterFormData) => {
    const reportedAt = new Date().toISOString();
    const disasterData = {
      ...data,
      reportedBy: data.reportedBy || "admin",
      reportedAt,
    };

    if (isEditing && editingDisaster) {
      axios
        .put(`${API_BASE_URL}/disasters/${editingDisaster.id}`, disasterData)
        .then((response) => {
          setDisasters(
            disasters.map((d) =>
              d.id === editingDisaster.id ? response.data : d
            )
          );
          toast.success("Disaster updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating disaster:", error);
          toast.error("Failed to update disaster.");
        });
    } else {
      axios
        .post(`${API_BASE_URL}/disasters`, disasterData)
        .then((response) => {
          setDisasters([...disasters, response.data]);
          toast.success("Disaster added successfully.");
        })
        .catch((error) => {
          console.error("Error adding disaster:", error);
          toast.error("Failed to add disaster.");
        });
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

  const filteredDisasters = disasters.filter((disaster) => {
    const reportedBy = disaster.reportedBy?.toLowerCase() || ""; // Safely handle null or undefined
    if (filter === "all") return true;
    if (filter === "dmc" && reportedBy === "admin") return true;
    if (filter === "user" && reportedBy === "user") return true;
    return false;
  });

  return (
    <div className="px-8 md:px-24 flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-0">
          <div className="w-full h-20 flex-shrink-0 flex flex-row justify-between items-center">
            <Button
              variant="outline"
              className="ml-4 rounded-full shadow-md shadow-gray-400"
              onClick={handleAddDisaster}
              disabled={isAdding}
            >
              <Image
                src={add_icon}
                alt="Add"
                className="h-[18px] w-auto pr-2"
              />
              Add Disaster Location
            </Button>
            <select
              className="border border-gray-300 rounded-md px-4 py-1 text-sm font-medium"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="dmc">DMC Reports</option>
              <option value="user">User Reports</option>
            </select>
          </div>

          <div className="relative h-[90%]">
            {isAdding && (
              <div className="absolute top-4 left-4 z-10 bg-blue-100 text-blue-800 p-2 rounded-md shadow-md">
                Click on the map to select a location for the disaster.
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner border-t-blue-500 animate-spin"></div>
              </div>
            ) : (
              <GoogleMaps_forDisasterLocations
                onClick={handleMapClick}
                disasters={filteredDisasters}
                users={users}
                onEdit={handleEditDisaster}
                onDelete={handleDeleteDisaster}
              />
            )}

            {(isAdding || isEditing) && selectedLocation && (
              <div
                className="absolute bg-white shadow-lg rounded-lg p-4"
                style={{
                  top: `calc(10% + ${selectedLocation.latitude * 0.05}px)`,
                  left: `calc(70% + ${selectedLocation.longitude * 0.05}px)`,
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
