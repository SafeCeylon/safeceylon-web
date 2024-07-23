'use client';

import DisasterNavbar from '@/components/DisasterNavbar';
import RequestCard from '@/components/RequestCard';
import GoogleMaps from '@/components/GoogleMaps';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { browser: 'To Reply', visitors: 275, fill: '#6CE5E8' },
  { browser: 'Replied', visitors: 200, fill: '#41B8D5' },
  { browser: 'Closed', visitors: 187, fill: '#2D8BBA' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'To Reply',
    color: '#6CE5E8',
  },
  safari: {
    label: 'Replied',
    color: '#41B8D5',
  },
  firefox: {
    label: 'Closed',
    color: '#2D8BBA',
  },
} satisfies ChartConfig;

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="w-full flex gap-10 bg-white flex-wrap rounded-2xl">
        <div className="w-full flex flex-row gap-10 p-10 pb-0 h-1/4">
          <div className="w-1/3 bg-white h-full rounded-2xl shadow-md shadow-gray-400"></div>
          <div className="w-1/3 bg-white h-full rounded-2xl shadow-md shadow-gray-400"></div>
          <div className="w-1/3 bg-white h-full rounded-2xl shadow-md shadow-gray-400"></div>
        </div>

        <div className="w-full flex gap-10 p-10 pb-20 pt-0 h-3/4">
          <div className="w-1/2 h-full flex flex-row ">
            <div className="w-full flex flex-row bg-white h-full rounded-2xl shadow-md shadow-gray-400 mb-10">
              <div className="w-3/5 h-full bg-white rounded-2xl">
                <Card className="flex flex-col shadow-none border-none pt-5">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Pie Chart - Donut</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square max-h-[350px]"
                    >
                      <PieChart className="scale-125 pt-5">
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={chartData}
                          dataKey="visitors"
                          nameKey="browser"
                          innerRadius={60}
                        />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="w-2/5 bg-slate-400 rounded-2xl"></div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-14 h-full">
            <div className="w-full bg-white h-full rounded-2xl shadow-md shadow-gray-400 ">
              <GoogleMaps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
