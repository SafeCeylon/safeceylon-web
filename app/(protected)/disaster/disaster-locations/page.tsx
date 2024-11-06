// File: pages/admin.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GoogleMaps_withSearch from '@/components/GoogleMaps_withSearch';
import Image from 'next/image';
import add_icon from '@/public/assets/add_icon.svg';
import DisasterForm, { DisasterFormData } from '@/components/DisasterForm';

export default function Admin() {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // List of all disasters with their types and coordinates
  const [disasters, setDisasters] = useState<
    { lat: number; lng: number; type: string }[]
  >([]);

  const handleMapClick = (lat: number, lng: number) => {
    if (isAdding) {
      setSelectedLocation({ lat, lng });
    }
  };

  const handleAddDisaster = () => {
    setIsAdding(true);
    setSelectedLocation(null);
  };

  const handleFormSubmit = (data: DisasterFormData) => {
    console.log('Disaster data submitted:', data);
    setIsAdding(false);
    setDisasters([...disasters, data]);
    setSelectedLocation(null);
  };

  const handleFormCancel = () => {
    setIsAdding(false);
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

            <Select>
              <SelectTrigger className="w-[180px] mr-4 rounded-full shadow-md shadow-gray-400">
                <SelectValue placeholder="User Reports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User Reports</SelectItem>
                <SelectItem value="dmc">DMC Reports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative h-[90%]">
            {isAdding && (
              <div className="absolute top-4 left-4 z-10 bg-blue-100 text-blue-800 p-2 rounded-md shadow-md">
                Click on the map to select a location for the disaster.
              </div>
            )}

            <GoogleMaps_withSearch
              onClick={handleMapClick}
              disasters={disasters} // Pass disasters to render on map
            />

            {isAdding && selectedLocation && (
              <div
                className="absolute bg-white shadow-lg rounded-lg p-4"
                style={{
                  top: `calc(50% + ${selectedLocation.lat * 0.1}px)`,
                  left: `calc(50% + ${selectedLocation.lng * 0.1}px)`,
                }}
              >
                <DisasterForm
                  lat={selectedLocation.lat}
                  lng={selectedLocation.lng}
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
