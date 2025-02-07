"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "@/components/RequestCard";
import GoogleMaps_withSearch from "@/components/GoogleMaps_withSearch";
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

import { Users } from "lucide-react";

/*
must need foemat

  {
    type: <Flood | LandSlide | Hurricane>,
    lat: <latitude>,
    lng: <longitude>,
  }

*/

const locationTableData = [
  {
    type: "Flood",
    lat: 6.930744760579417,
    lng: 79.89585272911694,
  },
  // 6.899745085541083, 79.91594916918893 - Flood
  {
    type: "Flood",
    lat: 6.899745085541083,
    lng: 79.91594916918893,
  },
  // 6.949339272308375, 79.91821880178134 - Flood
  {
    type: "Flood",
    lat: 6.949339272308375,
    lng: 79.91821880178134,
  },
  // 6.923770323083465, 79.93573541773218 - Hurricane
  {
    type: "Hurricane",
    lat: 6.923770323083465,
    lng: 79.93573541773218,
  },
  // 6.933084520066893, 79.91076296697634 - Hurricane
  {
    type: "Hurricane",
    lat: 6.933084520066893,
    lng: 79.91076296697634,
  },
  // 6.897546289418614, 79.93515802002683 - LandSlide
  {
    type: "LandSlide",
    lat: 6.897546289418614,
    lng: 79.93515802002683,
  },
  // 6.886798314835731, 79.94064329822753 - LandSlide
  {
    type: "LandSlide",
    lat: 6.886798314835731,
    lng: 79.94064329822753,
  },
  {
    type: "LandSlide",
    lat: 6.9141692720477765,
    lng: 79.88430509873614,
  },
  // 6.9361899805264935, 79.9259541217618 - Hurricane
  {
    type: "Hurricane",
    lat: 6.9361899805264935,
    lng: 79.9259541217618,
  },
];

export default function Admin() {
  // Dashboard page Data

  // Disaster Victims Status
  const [
    disasterVictimStatusToReplyCount,
    setDisasterVictimStatusToReplyCount,
  ] = useState<number>(0);
  const [
    disasterVictimStatusRepliedCount,
    setDisasterVictimStatusRepliedCount,
  ] = useState<number>(0);
  const [disasterVictimStatusClosedCount, setDisasterVictimStatusClosedCount] =
    useState<number>(0);
  const totalDisasterVictimStatusCount =
    disasterVictimStatusToReplyCount +
    disasterVictimStatusRepliedCount +
    disasterVictimStatusClosedCount;
  const disasterVictimStatusToReplyPercentage = parseFloat(
    (
      (disasterVictimStatusToReplyCount / totalDisasterVictimStatusCount) *
      100
    ).toFixed(1)
  );
  const disasterVictimStatusRepliedPercentage = parseFloat(
    (
      (disasterVictimStatusRepliedCount / totalDisasterVictimStatusCount) *
      100
    ).toFixed(1)
  );
  const disasterVictimStatusClosedPercentage = parseFloat(
    (
      (disasterVictimStatusClosedCount / totalDisasterVictimStatusCount) *
      100
    ).toFixed(1)
  );

  // System User Count
  const [disasterOfficerCount, setDisasterOfficerCount] = useState<number>(0);
  const [publicUserCount, setPublicUserCount] = useState<number>(0);

  // Donations
  const [monetaryDonations, setMonetaryDonations] = useState<number>(0);

  const [suppliesDonationsWater, setSuppliesDonationsWater] =
    useState<number>(0);
  const [suppliesDonationsFood, setSuppliesDonationsFood] = useState<number>(0);
  const [
    suppliesDonationsMedicalSupplies,
    setSuppliesDonationsMedicalSupplies,
  ] = useState<number>(0);
  const [suppliesDonationsClothing, setSuppliesDonationsClothing] =
    useState<number>(0);
  const [suppliesDonationsOther, setSuppliesDonationsOther] =
    useState<number>(0);

  // fetch the number of requests for each status
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/disaster/dashboard"
      );
      // setVictimStats(response.data);
      console.log(response.data);
      setDisasterVictimStatusToReplyCount(
        response.data.disasterVictimStatusToReplyCount
      );
      setDisasterVictimStatusRepliedCount(
        response.data.disasterVictimStatusRepliedCount
      );
      setDisasterVictimStatusClosedCount(
        response.data.disasterVictimStatusClosedCount
      );
      setDisasterOfficerCount(response.data.disasterOfficerCount);
      setPublicUserCount(response.data.publicUserCount);
      setMonetaryDonations(response.data.monetaryDonations);
      setSuppliesDonationsWater(response.data.suppliesDonationsWater);
      setSuppliesDonationsFood(response.data.suppliesDonationsFood);
      setSuppliesDonationsMedicalSupplies(
        response.data.suppliesDonationsMedicalSupplies
      );
      setSuppliesDonationsClothing(response.data.suppliesDonationsClothing);
      setSuppliesDonationsOther(response.data.suppliesDonationsOther);
    } catch (error) {
      console.error("Error fetching victim stats:", error);
    }
  };

  // fetch the number of requests for each status on page load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20 mb-5">
      <div className="flex flex-col w-2/3 gap-14 h-full">
        <div className="flex w-full gap-20 h-1/4">
          <div className="text-black flex flex-col bg-[#FFF9F0] w-1/2 items-center justify-center h-full rounded-2xl">
            <h4 className="text-lg mt-[10px]">Disaster Victims Status</h4>
            <div className="flex w-full gap-5 px-10 h-full my-5 justify-between">
              <RequestCard
                percentage={disasterVictimStatusToReplyPercentage}
                messageCount={disasterVictimStatusToReplyCount}
              />
              <RequestCard
                percentage={disasterVictimStatusRepliedPercentage}
                messageCount={disasterVictimStatusRepliedCount}
              />
              <RequestCard
                percentage={disasterVictimStatusClosedPercentage}
                messageCount={disasterVictimStatusClosedCount}
              />
            </div>
          </div>

          <div className="text-black flex flex-col w-1/2 items-center justify-center h-full rounded-2xl bg-[#FFF9F0] ">
            <h4 className="text-lg mt-[10px]">System User Count</h4>

            <div className="flex flex-row justify-evenly  h-full mt-2 mb-5 w-full">
              <Card
                x-chunk="dashboard-01-chunk-1"
                className="shadow-md shadow-gray-400"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Disaster Officers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {disasterOfficerCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Through web app
                  </p>
                </CardContent>
              </Card>

              <Card
                x-chunk="dashboard-01-chunk-1"
                className="shadow-md shadow-gray-400"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Public Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{publicUserCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Through mobile app
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="w-full bg-white h-3/4 rounded-2xl">
          <GoogleMaps_withSearch />
        </div>
      </div>

      <div className="w-1/3 h-full flex flex-col gap-10 mb-10">
        <div className="text-black flex flex-col bg-[#FFF9F0] w-full items-center justify-center rounded-2xl">
          <RecordChart />
        </div>

        <div className="w-full bg-[#FFF9F0] h-full rounded-2xl p-5 pb-2">
          <div className="w-full h-[5%] flex justify-center items-center pb-2">
            <p className="text-xl pb-2 font-bold">Donation Summary</p>
          </div>

          <div className="w-full h-[95%] px-5 flex flex-col border-2 rounded-2xl  bg-slate-100 drop-shadow-lg">
            <div className="w-full flex flex-row items-center pl-2">
              <div className="flex w-full flex-col">
                {/* Monetary Donations Card */}
                <div className="w-full">
                  <h4 className="text-lg pt-2 font-bold">Monetary Donations</h4>
                  <div>
                    <div className="text-xl font-bold">
                      Rs.{" "}
                      {monetaryDonations.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Received in total
                    </p>
                  </div>
                </div>

                {/* Supply Donations Card */}
                <div className="w-full pt-2">
                  <h4 className="text-lg font-bold">Supply Donations</h4>
                  <Table className="w-full">
                    <TableHeader className="w-full">
                      <TableRow className="w-full">
                        <TableHead className="w-2/4">Supply Type</TableHead>
                        <TableHead className="w-1/4">Quantity</TableHead>
                        <TableHead className="w-1/4">Unit Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Water</TableCell>
                        <TableCell>{suppliesDonationsWater}</TableCell>
                        <TableCell>5 litre bottles</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Food</TableCell>
                        <TableCell>{suppliesDonationsFood}</TableCell>
                        <TableCell>Units</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Medical Supplies
                        </TableCell>
                        <TableCell>
                          {suppliesDonationsMedicalSupplies}
                        </TableCell>
                        <TableCell>Units</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Clothing</TableCell>
                        <TableCell>{suppliesDonationsClothing}</TableCell>
                        <TableCell>Units</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Other</TableCell>
                        <TableCell>{suppliesDonationsOther}</TableCell>
                        <TableCell>Units</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export locationTableData
export { locationTableData };
