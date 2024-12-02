"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import add_icon from "@/public/assets/add_icon.svg";
import DefaultOfficerImage from "@/public/assets/default_officer_image.png";
import Updateicon from "@/public/assets/update_icon.svg";
import DeleteIcon from "@/public/assets/delete_icon.svg";
import OfficerForm from "@/components/OfficerForm";

interface Officer {
  id: string;
  name: string;
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

export default function OfficerDetails() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentOfficer, setCurrentOfficer] = useState<Officer | null>(null);

  const handleEdit = (officer: Officer) => {
    setCurrentOfficer(officer);
    setIsFormVisible(true);
  };

  const fetchOfficers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/disaster"
      );
      setOfficers(response.data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-0">
          <div className="px-20 w-full h-[11%] flex-shrink-0 flex flex-row justify-between items-center">
            <Button
              variant="outline"
              className="rounded-full shadow-md shadow-gray-400"
              onClick={() => setIsFormVisible(true)}
            >
              <Image
                src={add_icon}
                alt="Add Icon"
                className="h-[18px] w-auto pr-2"
              />
              Add Officer
            </Button>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg px-3 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="px-20 py-5 grid gap-x-28 grid-cols-3 overflow-y-auto">
            {filteredOfficers.map((officer) => (
              <div
                key={officer.id}
                className="w-full h-[120px] flex flex-row rounded-2xl shadow-md shadow-gray-400 mb-[20px]"
              >
                <div
                  className="w-[25%] rounded-2xl rounded-r-none"
                  style={{ backgroundColor: "#9ACC99" }}
                >
                  <Image
                    className="w-full h-full object-contain object-center rounded-2xl rounded-r-none"
                    src={officer.image || DefaultOfficerImage}
                    alt={officer.name}
                    width={100}
                    height={100}
                  />
                </div>

                <div className="h-full w-[65%] pl-10 py-5 flex flex-col justify-center items-start gap-2">
                  <p className="font-semibold">{officer.name}</p>
                  <p className="text-sm text-gray-600">{officer.role}</p>
                  <p className="text-sm text-gray-600">
                    {officer.mobileNumber}
                  </p>
                </div>
                <div className="h-full w-[10%] rounded-2xl rounded-l-none flex flex-col justify-between items-end py-3 pr-3">
                  <button onClick={() => handleEdit(officer)}>
                    <div className="w-full flex">
                      <Image
                        src={Updateicon}
                        alt="Update Icon"
                        width={24}
                        height={24}
                      />
                    </div>
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://localhost:8080/api/users/${officer.id}`
                        );
                        setOfficers((prev) =>
                          prev.filter((item) => item.id !== officer.id)
                        );
                      } catch (error) {
                        console.error("Error deleting officer:", error);
                      }
                    }}
                    className="w-full flex"
                  >
                    <Image
                      src={DeleteIcon}
                      alt="Delete Icon"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isFormVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
              <div className="bg-white w-[90%] md:w-[50%] rounded-lg shadow-lg flex flex-col p-2 h-[85%] overflow-auto">
                <button
                  className="text-red-500 flex w-full justify-end"
                  onClick={() => setIsFormVisible(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <OfficerForm
                  officerData={currentOfficer}
                  onSuccess={() => {
                    fetchOfficers();
                    setIsFormVisible(false);
                    setCurrentOfficer(null);
                  }}
                  role="DISASTER_OFFICER"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
