"use client";

import RequestCard from "@/components/RequestCard";
import GoogleMaps from "@/components/GoogleMaps_withSearch";

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20 py-10">
      <div className="flex flex-col w-3/5 gap-14 h-full">
        <GoogleMaps />
      </div>
      <div className="w-2/5 h-full flex flex-col gap-14">
        <div className="text-black flex flex-col bg-white w-full items-center h-1/2 rounded-2xl"></div>
        <div className="w-full bg-white h-1/2 rounded-2xl"></div>
      </div>
    </div>
  );
}
