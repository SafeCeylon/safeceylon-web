"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import images from "../constants/images";
import { StaticImageData } from "next/image";

interface GoogleMapsWithSearchProps {
  onClick: (lat: number, lng: number) => void;
  disasters: {
    latitude: number;
    longitude: number;
    type: string;
    radius: number; // Include radius for circle drawing
  }[];
}

const disasterIcons: Record<string, StaticImageData> = {
  flood: images.Flood,
  landslide: images.Landslide,
  hurricane: images.Hurricane,
};

const disasterColors: Record<string, string> = {
  flood: "#ADD8E6", // Light blue
  landslide: "#D2B48C", // Light brown
  hurricane: "#D3D3D3", // Light gray
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

      disasters.forEach((disaster) => {
        const disasterMarker = new google.maps.Marker({
          position: { lat: disaster.latitude, lng: disaster.longitude },
          map,
          icon: createCustomIcon(disasterIcons[disaster.type].src),
          title: `Disaster Type: ${disaster.type}`,
        });

        new google.maps.Circle({
          center: { lat: disaster.latitude, lng: disaster.longitude },
          radius: disaster.radius,
          fillColor: disasterColors[disaster.type],
          fillOpacity: 0.4,
          strokeColor: disasterColors[disaster.type],
          strokeOpacity: 0.8,
          strokeWeight: 2,
          map,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div><strong>Type:</strong> ${disaster.type}<br><strong>Radius:</strong> ${disaster.radius} meters</div>`,
        });

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
