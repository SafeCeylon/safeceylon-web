'use client';

import RequestCard from '@/components/RequestCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import GoogleMaps from '@/components/GoogleMaps_withSearch';

import Link from 'next/link';

import Image from 'next/image';
import add_icon from '@/public/assets/add_icon.svg';

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-2">
          <div className="w-full h-20 flex-shrink-0 flex flex-row">
            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
            >
              <Image
                src={add_icon}
                alt="add_icon"
                className="h-[18px] w-auto pr-2"
              />
              <Link href="/public-weather">Public Weather</Link>
            </Button>

            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
            >
              <Image
                src={add_icon}
                alt="add_icon"
                className="h-[18px] w-auto pr-2"
              />
              <Link href="/marine-weather">Marine Weather</Link>
            </Button>

            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
            >
              <Image
                src={add_icon}
                alt="add_icon"
                className="h-[18px] w-auto pr-2"
              />
              <Link href="/city-forecasts">City Forecasts</Link>
            </Button>

            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
            >
              <Image
                src={add_icon}
                alt="add_icon"
                className="h-[18px] w-auto pr-2"
              />
              <Link href="/nine-day-forecasts">9 Day Forecasts</Link>
            </Button>

          </div>

          <div className="h-[90%]">
            <GoogleMaps />
          </div>
        </div>
      </div>
    </div>
  );
}
