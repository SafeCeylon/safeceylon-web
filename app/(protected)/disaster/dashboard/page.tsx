'use client';

import RequestCard from '@/components/RequestCard';
import GoogleMaps_withSearch from '@/components/GoogleMaps_withSearch';
import RecordChart from '@/components/RecordChart';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Users } from "lucide-react"


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
    lng:  79.88430509873614,
  },
  // 6.9361899805264935, 79.9259541217618 - Hurricane
  {
    type: "Hurricane",
    lat: 6.9361899805264935,
    lng: 79.9259541217618,
  }, 
]

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20 mb-5">
      <div className="flex flex-col w-2/3 gap-14 h-full">
        <div className="flex w-full gap-20 h-1/4">

        <div className="text-black flex flex-col bg-[#FFF9F0] w-1/2 items-center justify-center h-full rounded-2xl">
            <h4 className="text-lg mt-[10px]">Disaster Victims Status</h4>
            <div className="flex w-full gap-5 px-10 h-full my-5 ">
              <RequestCard />
              <RequestCard />
              <RequestCard />
            </div>
          </div>

          <div className="text-black flex flex-col w-1/2 items-center justify-center h-full rounded-2xl bg-[#FFF9F0] ">
            
            <h4 className="text-lg mt-[10px]">System User Count</h4>

            <div className='flex flex-row justify-evenly  h-full mt-2 mb-5 w-full'>

            <Card x-chunk="dashboard-01-chunk-1" className='shadow-md shadow-gray-400'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Disaster Officers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2000</div>
                <p className="text-xs text-muted-foreground">
                  Through web app
                </p>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-1" className='shadow-md shadow-gray-400'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Public Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2000</div>
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


      <div className="w-1/3 h-full flex flex-col gap-14 mb-10">
      
        <div className="text-black flex flex-col bg-[#FFF9F0] w-full items-center justify-center rounded-2xl">         
            <RecordChart />
        </div>

        <div className="w-full bg-white h-full rounded-2xl p-5">
          <div className='w-full h-[5%] flex justify-center items-center pb-2'>
            <p className='text-lg font-bold'>Disaster Updates</p>
          </div>

          <div className='w-full h-[95%] px-5 flex flex-col border-2 rounded-2xl border-gray-300'>
            
            <div className='w-full flex flex-row items-center py-3 pl-2 gap-5'>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="User Reports" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">User Reports</SelectItem>
                  <SelectItem value="dark">User Reports</SelectItem>
                  <SelectItem value="system">User Reports</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Last Week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Last Week</SelectItem>
                  <SelectItem value="dark">Last Week</SelectItem>
                  <SelectItem value="system">Last Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='w-full h-[230px] overflow-y-auto'>              
              <Table>
                <TableHeader className='bg-slate-300'>
                  <TableRow>
                    <TableHead className="w-1/5 text-gray-950 font-bold text-[15px]">Type</TableHead>
                    <TableHead className="w-2/5 text-gray-950 font-bold text-[15px]">Latitude</TableHead>
                    <TableHead className="w-2/5 text-gray-950 font-bold text-[15px]">Longitude</TableHead>                                      
                  </TableRow>
                </TableHeader>
                <TableBody>
                  
                  {/* gettin data from the locationTableData */}
                  {locationTableData.map((data, index) => (
                    <TableRow key={index}
                    // highlight the row based on the type
                      className={data.type === "Flood" ? "bg-[#C4CDFD]" : data.type === "LandSlide" ? "bg-[#DAC8FF]" : "bg-[#C7FFD8]"}
                    >
                      <TableCell className='font-bold'>{data.type}</TableCell>
                      <TableCell>{data.lat}</TableCell>
                      <TableCell>{data.lng}</TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

// export locationTableData
export { locationTableData };