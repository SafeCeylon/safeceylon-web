"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import geoData from "@/public/assets/geo_data/dsd.json";

type DisasterType = "flood" | "landslide" | "hurricane";

interface GoogleMapsWithSearchProps {
  onClick: (dsd: { name: string; code: string; coordinates: any }) => void;
  disasters: {
    name: string;
    code: string;
    type: DisasterType;
  }[];
}

export default function GoogleMaps_withSearch({
  onClick,
  disasters,
}: GoogleMapsWithSearchProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const map = new Map(mapRef.current as HTMLDivElement, {
        center: { lat: 7.8731, lng: 80.7718 }, // Centered on Sri Lanka
        zoom: 8,
        mapTypeId: "roadmap", // Ensure the map type is set to "roadmap"
        disableDefaultUI: true, // Disable all default UI elements (places, zoom controls, etc.)
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

      // Add DSD GeoJSON to the map
      map.data.addGeoJson(geoData);

      // Style the DSD regions
      map.data.setStyle({
        fillColor: "#d2fcdd50",
        strokeWeight: 1,
        strokeColor: "#00000050",
      });

      let customInfoWindow: HTMLDivElement | null = null;

      // Add a mouseover listener to show DSD name with a custom close button
      map.data.addListener(
        "mouseover",
        (event: { feature: any; latLng: any; domEvent: MouseEvent }) => {
          const feature = event.feature;
          const dsdName = feature.getProperty("ADM3_EN");

          // Remove the previous custom info window
          if (customInfoWindow) {
            customInfoWindow.remove();
          }

          // Create a new custom info window
          customInfoWindow = document.createElement("div");
          customInfoWindow.style.position = "absolute";
          customInfoWindow.style.background = "#ffffff";
          customInfoWindow.style.border = "1px solid #ccc";
          customInfoWindow.style.borderRadius = "4px";
          customInfoWindow.style.padding = "8px";
          customInfoWindow.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
          customInfoWindow.style.pointerEvents = "auto";

          // Add DSD name
          const nameElement = document.createElement("span");
          nameElement.textContent = dsdName;
          customInfoWindow.appendChild(nameElement);

          // Position the info window near the mouse point
          const mouseEvent = event.domEvent;
          customInfoWindow.style.left = `${mouseEvent.pageX + 10}px`; // Offset for better visibility
          customInfoWindow.style.top = `${mouseEvent.pageY + 10}px`;

          document.body.appendChild(customInfoWindow);
        }
      );

      // Add a mouseout listener to close the custom info window
      map.data.addListener("mouseout", () => {
        customInfoWindow?.remove();
        customInfoWindow = null;
      });

      // Highlight disasters on the map
      disasters.forEach((disaster) => {
        map.data.forEach((feature) => {
          if (feature.getProperty("ADM3_PCODE") === disaster.code) {
            map.data.overrideStyle(feature, { fillColor: "red" });
          }
        });
      });
    };

    initializeMap();
  }, [onClick, disasters]);

  return <div className="h-full w-full rounded-2xl" ref={mapRef}></div>;
}
