"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "@/components/RequestCard";
import GoogleMaps from "@/components/GoogleMaps_withSearch";
import RecordChart from "@/components/RecordChart";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Admin() {
  // In backend :
  // private String id;
  // private String date;
  // private String timeIssued;
  // private String province;
  // private String district;
  // private String condition;
  // private String windSpeeds;
  // private String rainfallType;

  const [meteorologyData, setMeteorologyData] = useState<
    {
      id: string;
      date: string;
      timeIssued: string;
      province: string;
      district: string;
      condition: string;
      windSpeeds: string;
      rainfallType: string;
    }[]
  >([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/meteorology/dashboard"
      );
      // console.log(response.data);

      // Assuming response.data is the raw array, map it to ensure correct structure
      const formattedData = response.data.map((item: any) => ({
        id: item.id,
        date: item.date,
        timeIssued: item.timeIssued,
        province: item.province,
        district: item.district,
        condition: item.condition,
        windSpeeds: item.windSpeeds,
        rainfallType: item.rainfallType,
      }));

      setMeteorologyData(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Error fetching meteorology data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-14 py-10">
      <div className="flex flex-col w-3/5 gap-14 h-full">
        <GoogleMaps />
      </div>
      <div className="w-2/5 h-full flex flex-col gap-10">
        <div className="text-black flex flex-col bg-white w-full items-center h-1/2 rounded-2xl">
          <RecordChart />
        </div>

        <div className="w-full bg-[#FFF9F0] h-1/2 rounded-2xl p-5 overflow-y-auto">
          <div className="w-full pt-2 flex flex-col">
            <h4 className="text-lg font-bold">Meteorology Data</h4>
            <Table className="w-full">
              <TableHeader className="w-full">
                <TableRow className="w-full">
                  <TableHead className="w-1/4">Date</TableHead>
                  <TableHead className="w-1/4">District(s)</TableHead>
                  <TableHead className="w-1/4">Wind Speeds</TableHead>
                  <TableHead className="w-1/4">Rainfall Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meteorologyData.length > 0 ? (
                  meteorologyData.map((data) => (
                    <TableRow key={data.id} className="w-full">
                      <TableCell className="w-1/4">{data.date}</TableCell>
                      <TableCell className="w-1/4">{data.district}</TableCell>
                      <TableCell className="w-1/4">{data.windSpeeds}</TableCell>
                      <TableCell className="w-1/4">{data.rainfallType}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="w-full">
                    <TableCell className="w-full text-center py-4" colSpan={4}>
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
