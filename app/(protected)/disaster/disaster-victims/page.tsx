'use client';

import RequestCard from '@/components/RequestCard';
import GoogleMaps_withSearch from '@/components/GoogleMaps_withSearch';
import { Progress } from "@/components/ui/progress"

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import Link from 'next/link';

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

// 3 float values fo "To Reply", "Replied", "Closed"
const ToReply = 60;
const Replied = 40;
const Closed = 20;
const max_progress = ToReply + Replied + Closed;

const chartData = [
  { browser: 'To Reply', visitors: ToReply, fill: '#6CE5E8' },
  { browser: 'Replied', visitors: Replied, fill: '#41B8D5' },
  { browser: 'Closed', visitors: Closed, fill: '#2D8BBA' },
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
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-10">
      <div className="w-full flex bg-white flex-col gap-10 rounded-2xl">
        <div className="w-full flex flex-row gap-10 p-10 pb-0 h-1/4">

          <Link className='w-1/3' href={'/disaster/disaster-victims/chat/'}>
            <div className="w-full bg-ToReply h-full rounded-2xl shadow-md shadow-gray-400 flex flex-row">
              <div className='w-4/5 flex flex-col justify-center rounded-2xl'>
                <p className='pl-5 pb-5 text-active font-bold text-2xl'>To Reply</p>
                <div className='flex flex-row items-end'>
                  <p className='pl-5 text-white font-bold text-5xl'>{ToReply}</p>
                  <p className='text-white pl-1 font-bold text-lg'>requests</p>
                </div>
              </div>
              <div className='flex justify-center w-1/5 items-center bg-slate-100 rounded-2xl rounded-l-none'>
                <svg width="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 12.5L40 30L22.5 47.5" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>

          <Link className='w-1/3' href={'/disaster/disaster-victims/chat/'}>
            <div className="w-full bg-Replied h-full rounded-2xl shadow-md shadow-gray-400 flex flex-row">
              <div className='w-4/5 flex flex-col justify-center rounded-2xl'>
                <p className='pl-5 pb-5 text-active font-bold text-2xl'>Replied</p>
                <div className='flex flex-row items-end'>
                  <p className='pl-5 text-white font-bold text-5xl'>{Replied}</p>
                  <p className='text-white pl-1 font-bold text-lg'>requests</p>
                </div>
              </div>
              <div className='flex justify-center w-1/5 items-center bg-slate-100 rounded-2xl rounded-l-none'>
                <svg width="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 12.5L40 30L22.5 47.5" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>

          <Link className='w-1/3' href={'/disaster/disaster-victims/chat/'}>
            <div className="w-full bg-Closed h-full rounded-2xl shadow-md shadow-gray-400 flex flex-row">
              <div className='w-4/5 flex flex-col justify-center rounded-2xl'>
                <p className='pl-5 pb-5 text-active font-bold text-2xl'>Closed</p>
                <div className='flex flex-row items-end'>
                  <p className='pl-5 text-white font-bold text-5xl'>{Closed}</p>
                  <p className='text-white pl-1 font-bold text-lg'>requests</p>
                </div>
              </div>
              <div className='flex justify-center w-1/5 items-center bg-slate-100 rounded-2xl rounded-l-none'>
                <svg width="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 12.5L40 30L22.5 47.5" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full flex gap-10 p-10 pt-0 h-3/4">
          <div className="w-1/2 h-full flex flex-row ">
            <div className="w-full flex flex-row bg-slate-100 h-full rounded-2xl shadow-md shadow-gray-400 mb-10">
              <div className="w-3/5 h-full rounded-2xl flex flex-col justify-center">
                <Card className="flex flex-col shadow-none border-none bg-slate-100">
                  <CardHeader className="items-center pb-0 pt-0">
                    <CardTitle>Pie Chart - Donut</CardTitle>
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

              <div className="w-2/5 rounded-2xl flex flex-col justify-center pr-10 gap-5">
                <div> 
                  <p className='font-extrabold text-gray-500 pb-3'>To Reply</p>
                  <Progress  value={(ToReply / max_progress) * 100} className='h-7' indicatorColor="bg-progress_color_1" />
                </div>
                <div>
                  <p className='font-extrabold text-gray-500 pb-3'>Replied</p>
                  <Progress max={max_progress} value={(Replied / max_progress) * 100} className='h-7' indicatorColor="bg-progress_color_2" />
                </div>
                <div>
                  <p className='font-extrabold text-gray-500 pb-3'>Closed</p>
                  <Progress max={max_progress} value={(Closed / max_progress) * 100} className='h-7' indicatorColor="bg-progress_color_3" />
                </div>
                
              </div>

            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-14 h-full">
            <div className="w-full bg-white h-full rounded-2xl shadow-md shadow-gray-400 ">
              <GoogleMaps_withSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
