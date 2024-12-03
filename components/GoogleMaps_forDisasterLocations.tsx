"use client";

import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import images from "../constants/images";
import { StaticImageData } from "next/image";
import axios from "axios";

interface GoogleMapsWithSearchProps {
  onClick: (lat: number, lng: number) => void;
  disasters: {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    radius: number;
    reportedAt: string;
    resolved: boolean;
    reportedBy: string;
  }[];
  onEdit: (disaster: {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    radius: number;
    reportedAt: string;
    resolved: boolean;
    reportedBy: string;
  }) => void;
  onDelete: (id: string) => void;
  users: {
    id: string;
    latitude: number;
    longitude: number;
  }[];
}

const disasterIcons: Record<string, StaticImageData> = {
  Flood: images.Flood,
  Landslide: images.Landslide,
  Hurricane: images.Hurricane,
};

const disasterColors: Record<string, string> = {
  Flood: "#ADD8E6", // Light blue
  Landslide: "#D2B48C", // Light brown
  Hurricane: "#D3D3D3", // Light gray
};

function createCustomIcon(iconUrl: string): google.maps.Icon {
  return {
    url: iconUrl,
    scaledSize: new google.maps.Size(30, 30),
    anchor: new google.maps.Point(15, 15),
    labelOrigin: new google.maps.Point(15, 15),
  };
}

function calculateThreatLevel(distance: number, radius: number): string {
  if (distance <= radius / 3) return "Red";
  if (distance <= (2 * radius) / 3) return "Amber";
  return "Yellow";
}

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000; // Convert to meters
}

export default function GoogleMaps_forDisasterLocations({
  onClick,
  disasters,
  onEdit,
  onDelete,
  users,
}: GoogleMapsWithSearchProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const notifiedUsers = useRef(new Set<string>());

  // Function to send notifications via Axios
  const notifyUser = async (
    userId: string,
    title: string,
    message: string,
    threatLevel: string
  ) => {
    try {
      await axios.post("http://localhost:8080/api/v1/notifications", {
        userId,
        title,
        message,
        threatLevel,
        date: new Date().toISOString(),
        cleared: false,
        status: "active",
      });
    } catch (error) {
      console.error("Error sending notification", error);
    }
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

      map.setOptions({
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "landscape",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "road",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "transit",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // Map click listener
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

      // Render disasters
      disasters.forEach((disaster) => {
        const disasterMarker = new google.maps.Marker({
          position: { lat: disaster.latitude, lng: disaster.longitude },
          map,
          icon: createCustomIcon(disasterIcons[disaster.type].src),
          title: `Disaster Type: ${disaster.type}`,
        });

        // Add disaster circle
        new google.maps.Circle({
          center: { lat: disaster.latitude, lng: disaster.longitude },
          radius: disaster.radius,
          fillColor: disasterColors[disaster.type],
          fillOpacity: 0.4,
          strokeColor: disasterColors[disaster.type],
          strokeOpacity: 0.8,
          strokeWeight: 2,
          map,
          clickable: false, // Ensures the circle does not block clicks to the map
        });

        users.forEach((user) => {
          const distance = haversine(
            disaster.latitude,
            disaster.longitude,
            user.latitude,
            user.longitude
          );

          if (
            distance <= disaster.radius &&
            !notifiedUsers.current.has(`${user.id}-${disaster.id}`)
          ) {
            notifiedUsers.current.add(`${user.id}-${disaster.id}`);

            const threatLevel = calculateThreatLevel(distance, disaster.radius);
            const title = `${disaster.type} Alert`;
            const message = `You are within the disaster zone. Stay safe!`;

            notifyUser(user.id, title, message, threatLevel);
          }
        });

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
              <img
                src="${disasterIcons[disaster.type].src}"
                alt="${disaster.type}"
                style="
                  display: block;
                  margin: 0 auto 10px;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;"
              />
              <b>Type:</b> ${disaster.type}<br>
              <b>Radius:</b> ${disaster.radius} meters<br>
              <button id="edit-btn-${disaster.id}"
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
              <button id="delete-btn-${disaster.id}"
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

        // Add info window click listener
        disasterMarker.addListener("click", () => {
          infoWindow.open({
            anchor: disasterMarker,
            map,
            shouldFocus: false,
          });
        });

        // Wait for the DOM to be ready for button clicks
        google.maps.event.addListenerOnce(infoWindow, "domready", () => {
          const editButton = document.getElementById(`edit-btn-${disaster.id}`);
          const deleteButton = document.getElementById(
            `delete-btn-${disaster.id}`
          );

          editButton?.addEventListener("click", () => {
            onEdit(disaster);
            infoWindow.close();
          });

          deleteButton?.addEventListener("click", () => {
            onDelete(disaster.id);
            infoWindow.close();
          });
        });
      });
    };

    initializeMap();
  }, [onClick, disasters, marker, onEdit, onDelete, users]);

  return <div className="h-full w-full rounded-2xl" ref={mapRef}></div>;
}
