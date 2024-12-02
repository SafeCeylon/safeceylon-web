"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import images from "../constants/images";
import { StaticImageData } from "next/image";

type DisasterType = "flood" | "landslide" | "hurricane";

interface GoogleMapsWithSearchProps {
  onClick: (lat: number, lng: number) => void;
  disasters: {
    lat: number;
    lng: number;
    type: DisasterType;
    // details: string;
  }[]; // Add `details` property
}

const disasterIcons: Record<DisasterType, StaticImageData> = {
  flood: images.Flood,
  landslide: images.Landslide,
  hurricane: images.Hurricane,
};

function createCustomIcon(iconUrl: string): google.maps.Icon {
  return {
    url: iconUrl,
    scaledSize: new google.maps.Size(30, 30),
    anchor: new google.maps.Point(15, 15),
    labelOrigin: new google.maps.Point(15, 15),
  };
}

export default function GoogleMaps_withSearch({
  onClick,
  disasters,
}: GoogleMapsWithSearchProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
        libraries: ["places"],
      });

      const { Map, InfoWindow } = await loader.importLibrary("maps");

      const map = new Map(mapRef.current as HTMLDivElement, {
        center: { lat: 7.8731, lng: 80.7718 },
        zoom: 8,
        mapTypeId: "roadmap", // Use "roadmap" to show only the roads and markers
        disableDefaultUI: true, // Disable all default UI elements (like places)
        zoomControl: true, // Enable zoom control
        streetViewControl: false, // Disable street view
        mapTypeControl: false, // Disable map type control
        fullscreenControl: false, // Disable fullscreen control
        gestureHandling: "cooperative", // Enable map gestures
      });

      // Add custom map styles to hide POIs (like restaurants, shops, etc.)
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
        ],
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

      // Place markers for each disaster with specific icons
      disasters.forEach((disaster) => {
        const disasterMarker = new google.maps.Marker({
          position: { lat: disaster.lat, lng: disaster.lng },
          map,
          icon: createCustomIcon(disasterIcons[disaster.type].src),
          title: `Disaster Type: ${disaster.type}`,
        });

        // Create an InfoWindow for the disaster details
        const infoWindow = new InfoWindow({
          content: `<div><strong>Type:</strong> ${disaster.type}<br><strong>Details:</strong></div>`,
        });

        // Show InfoWindow when marker is clicked
        disasterMarker.addListener("click", () => {
          infoWindow.open({
            anchor: disasterMarker,
            map,
            shouldFocus: false,
          });
        });
      });
    };

    initializeMap();
  }, [onClick, marker, disasters]);

  return <div className="h-full w-full rounded-2xl" ref={mapRef}></div>;
}
