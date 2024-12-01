"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import DefaultOfficerImage from "@/public/assets/default_officer_image.png";

interface FormData {
  name: string;
  employeeNumber: string;
  nic: string;
  email: string;
  mobileNumber: string;
  address: string;
  password: string;
  role: string;
  image: string | null;
  latitude: number;
  longitude: number;
}

export default function OfficerForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    employeeNumber: "",
    nic: "",
    email: "",
    mobileNumber: "",
    address: "",
    password: "",
    role: "DISASTER_OFFICER",
    image: null,
    latitude: 6.9271, // Default to Colombo, Sri Lanka
    longitude: 79.8612,
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    // Initialize Google Map
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
    googleMapsScript.async = true;
    googleMapsScript.onload = () => {
      const mapInstance = new google.maps.Map(
        document.getElementById("map-container") as HTMLElement,
        {
          center: { lat: formData.latitude, lng: formData.longitude },
          zoom: 12,
        }
      );

      const marker = new google.maps.Marker({
        position: { lat: formData.latitude, lng: formData.longitude },
        map: mapInstance,
        draggable: true,
      });

      marker.addListener("dragend", () => {
        const position = marker.getPosition();
        if (position) {
          // Ensure position is not null
          setFormData((prev) => ({
            ...prev,
            latitude: position.lat(),
            longitude: position.lng(),
          }));
        }
      });

      mapInstance.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          // Check if e.latLng is not null
          marker.setPosition(e.latLng);
          setFormData((prev) => ({
            ...prev,
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng(),
          }));
        }
      });

      setMap(mapInstance);
    };

    document.head.appendChild(googleMapsScript);
    return () => {
      if (googleMapsScript.parentNode) {
        googleMapsScript.parentNode.removeChild(googleMapsScript);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.employeeNumber.trim())
      newErrors.employeeNumber = "Employee Number is required.";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile Number is required.";
    else if (!/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Mobile Number must be 10 digits.";
    if (!formData.latitude || !formData.longitude)
      newErrors.location = "Please select a location on the map.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:8080/api/users/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Officer added successfully!");
      onSuccess();
      setFormData({
        name: "",
        employeeNumber: "",
        nic: "",
        email: "",
        mobileNumber: "",
        address: "",
        password: "",
        role: "DISASTER_OFFICER",
        image: null,
        latitude: 6.9271, // Reset to default location
        longitude: 79.8612,
      });
      setProfileImage(null);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add officer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl px-8 py-4 bg-white"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Add Officer Details
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <p className="text-lg font-medium mb-4 text-gray-600">
              Profile Image
            </p>
            <Image
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : DefaultOfficerImage
              }
              alt="Profile"
              className="rounded-full shadow-md"
              width={120}
              height={120}
            />
          </div>
          <input
            type="file"
            onChange={handleFileUpload}
            className="mt-2 text-sm text-gray-600"
          />
        </div>
        <div className="space-y-2">
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <InputField
              label="Employee Number"
              name="employeeNumber"
              value={formData.employeeNumber}
              onChange={handleChange}
              error={errors.employeeNumber}
            />
          </div>
          <div className="space-y-2">
            <InputField
              label="NIC"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              error={errors.nic}
            />
          </div>
        </div>
        <div className="space-y-2">
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className="space-y-2">
          <InputField
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            error={errors.mobileNumber}
          />
        </div>
        <div className="space-y-2">
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium mb-1">
            Location (Click or drag marker on map)
          </label>
          <div id="map-container" className="h-64 border rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              readOnly
              value={formData.latitude}
              placeholder="Latitude"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              readOnly
              value={formData.longitude}
              placeholder="Longitude"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className={`w-full mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded font-semibold ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Officer"}
      </button>
    </form>
  );
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
