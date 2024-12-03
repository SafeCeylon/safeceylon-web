"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import images from "../constants/images";
import { StaticImageData } from "next/image";

interface GoogleMapsProps {
  onClick: (lat: number, lng: number) => void;
  entries: {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    capacity?: number;
    name?: string;
    contact?: string;
  }[];
  onEdit: (entry: {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    capacity?: number;
    name?: string;
    contact?: string;
  }) => void;
  onDelete: (id: string) => void;
}

const entryIcons: Record<string, StaticImageData> = {
  shelter: images.Shelter,
  hospital: images.Hospital,
};

export default function GoogleMaps_forHospitalShelters({
  onClick,
  entries,
  onEdit,
  onDelete,
}: GoogleMapsProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const createCustomIcon = (iconUrl: string): google.maps.Icon => {
    return {
      url: iconUrl,
      scaledSize: new google.maps.Size(30, 30),
      anchor: new google.maps.Point(15, 15),
      labelOrigin: new google.maps.Point(15, 15),
    };
  };

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      await loader.load();

      const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
        center: { lat: 7.8731, lng: 80.7718 },
        zoom: 8,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        gestureHandling: "cooperative",
      });

      map.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          onClick(lat, lng);

          if (marker) {
            marker.setPosition(event.latLng);
          } else {
            setMarker(
              new google.maps.Marker({
                position: event.latLng,
                map,
                title: "Selected Location",
              })
            );
          }
        }
      });

      entries.forEach((entry) => {
        const marker = new google.maps.Marker({
          position: { lat: entry.latitude, lng: entry.longitude },
          map,
          icon: createCustomIcon(entryIcons[entry.type]?.src),
          title: `Disaster Type: ${entry.type}`,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
            <img
                src="${entryIcons[entry.type].src}"
                alt="${entry.type}"
                style="
                  display: block;
                  margin: 0 auto 10px;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;"
              />
              <b>Type:</b> ${entry.type}<br>
              <b>Name:</b> ${entry.name || "N/A"}<br>
              <b>Contact:</b> ${entry.contact || "N/A"}<br>
              <b>Capacity:</b> ${entry.capacity || "N/A"}<br>
              <button id="edit-btn-${entry.id}"
                      style="
                        font-size: 12px;
                        padding: 8px 12px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        margin: 5px 2px;
                        background-color: #007BFF;
                        color: white;
                        transition: background-color 0.3s ease;"
                      onmouseover="this.style.opacity=0.9"
                      onmouseout="this.style.opacity=1"
                      >Edit</button>
              <button id="delete-btn-${entry.id}"
                      style="
                        font-size: 12px;
                        padding: 8px 12px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        margin: 5px 2px;
                        background-color: #FF4D4D;
                        color: white;
                        transition: background-color 0.3s ease;"
                      onmouseover="this.style.opacity=0.9"
                      onmouseout="this.style.opacity=1"
                      >Delete</button>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });

        google.maps.event.addListenerOnce(infoWindow, "domready", () => {
          const editButton = document.getElementById(`edit-btn-${entry.id}`);
          const deleteButton = document.getElementById(
            `delete-btn-${entry.id}`
          );

          editButton?.addEventListener("click", () => {
            onEdit(entry);
            infoWindow.close();
          });

          deleteButton?.addEventListener("click", () => {
            onDelete(entry.id);
            infoWindow.close();
          });
        });
      });
    };

    initializeMap();
  }, [onClick, marker, entries, onEdit, onDelete]);

  return <div ref={mapRef} className="h-full w-full"></div>;
}
