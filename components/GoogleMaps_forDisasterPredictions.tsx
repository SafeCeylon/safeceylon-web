"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import geoData from "@/public/assets/geo_data/dsd.json";
import districtData from "@/public/assets/geo_data/districtData.json";
import axios from "axios";
import images from "@/constants/images";

interface GoogleMapsWithSearchProps {
  type: string;
}

export default function GoogleMapsForDisasterPredictions({
  type,
}: GoogleMapsWithSearchProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);

  const [weatherData, setWeatherData] = useState([]);
  const [landslideWarning, setLandslideWarning] = useState([]);
  const [airQuality, setAirQuality] = useState([]);

  // Fetch data based on the type prop
  const fetchData = async (url: string, setState: React.Dispatch<any>) => {
    try {
      const response = await axios.get(url);
      setState(response.data);
      console.log(`Data fetched from ${url}:`, response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    switch (type) {
      case "weather-reports":
        fetchData(
          "http://localhost:8080/api/users/get-weather",
          setWeatherData
        );
        break;
      case "landslide-warnings":
        fetchData(
          "http://localhost:8080/api/users/disaster-data",
          setLandslideWarning
        );
        break;
      case "quality-status":
        fetchData("http://localhost:8080/api/users/air-quality", setAirQuality);
        break;
      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const googleMaps = await loader.importLibrary("maps");
      const { Map } = googleMaps;
      // const Marker = googleMaps.Marker;

      const map = new Map(mapRef.current as HTMLDivElement, {
        center: { lat: 7.8731, lng: 80.7718 }, // Centered on Sri Lanka
        zoom: 8,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        gestureHandling: "cooperative",
      });

      if (type == "landslide-warnings") {
        map.data.addGeoJson(geoData);
      } else {
        map.data.addGeoJson(districtData);
      }

      map.setOptions({
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "landscape", stylers: [{ visibility: "simplified" }] },
          { featureType: "road", stylers: [{ visibility: "simplified" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
        ],
      });

      switch (type) {
        case "weather-reports":
          handleWeatherReports(map);
          break;
        case "landslide-warnings":
          handleLandslideWarnings(map);
          break;
        case "air-quality":
          map.data.addGeoJson(geoData);
          handleAirQuality(map);
        default:
          break;
      }
    };

    initializeMap();
  }, [type, weatherData, landslideWarning]);

  const handleWeatherReports = (map: any) => {
    const mergedWeatherData = weatherData.flatMap((item) => {
      const districts = item.district.trim().split(" ");
      console.log(districts); // Split space-separated districts
      return districts
        .map((districtName: string) => {
          const districtCenter = districtData.find(
            (district) =>
              district.district_name.toLowerCase() ===
              districtName.toLowerCase()
          );

          if (districtCenter) {
            return {
              id: `${item.id}-${districtName}`,
              condition: item.condition,
              rainfallType: item.rainfallType,
              windSpeeds: item.windSpeeds,
              coordinates: {
                lat: districtCenter.center.lat,
                lng: districtCenter.center.lng,
              },
            };
          }
          return null;
        })
        .filter(Boolean);
    });

    const infoWindow = new google.maps.InfoWindow();

    mergedWeatherData.forEach((data: any) => {
      console.log(data);
      const marker = new google.maps.Marker({
        position: data.coordinates,
        map,
        icon: {
          url: `@/public/assets/icons/weather-icon/flood_icon.png`, // Use your icon mapping here
          scaledSize: new google.maps.Size(30, 30), // Adjust size as needed
        },
        title: data.condition,
      });

      marker.addListener("click", () => {
        infoWindow.setContent(
          `<div>
            <h4>${data.condition}</h4>
            <p>Rainfall type: ${data.rainfallType}</p>
            <p>Wind speeds: ${data.windSpeeds} kmph</p>
          </div>`
        );
        infoWindow.open(map, marker);
      });
    });
  };

  // Handle landslide warnings logic
  const handleLandslideWarnings = (map: any) => {
    const landslideColors = {
      "Level 1 (Yellow)": "#FFFF00",
      "Level 2 (Amber)": "#FFC000",
      "Level 3 (Red)": "#FF0000",
    };

    map.data.setStyle((feature: any) => {
      const dsdName = feature.getProperty("ADM3_EN");
      let color = "#d2fcdd90"; // Default color for no warnings

      landslideWarning.forEach((warning) => {
        const divisions = warning.divisionalSecretariatDivisions.split(" ");
        if (divisions.includes(dsdName)) {
          color = landslideColors[warning.warningLevel];
        }
      });

      return {
        fillColor: color,
        strokeWeight: 0.3,
        strokeColor: "#00000050",
      };
    });
  };

  const airQualityColors = [
    { range: [0, 50], color: "#00FF00" }, // Healthy (Green)
    { range: [51, 100], color: "#FFFF00" }, // Moderate (Yellow)
    { range: [101, 150], color: "#FFA500" }, // Unhealthy for sensitive groups (Orange)
    { range: [151, 200], color: "#FF0000" }, // Unhealthy (Red)
    { range: [201, 300], color: "#800080" }, // Very unhealthy (Purple)
    { range: [301, 500], color: "#800000" }, // Hazardous (Maroon)
  ];

  const handleAirQuality = (map: any) => {
    map.data.setStyle((feature: any) => {
      const districtName = feature.getProperty("ADM2_EN");

      console.log(districtName);
      const districtAirQuality = airQuality.find(
        (entry: any) => entry.district === districtName
      );

      let color = "#d2fcdd90"; // Default color for areas without data

      if (districtAirQuality) {
        const aqi = districtAirQuality.aqi;
        for (const level of airQualityColors) {
          if (aqi >= level.range[0] && aqi <= level.range[1]) {
            color = level.color;
            break;
          }
        }
      }

      return {
        fillColor: color,
        fillOpacity: 0.6,
        strokeWeight: 0.1,
        strokeColor: "#00000050",
      };
    });
  };

  return <div className="h-full w-full rounded-2xl" ref={mapRef}></div>;
}
