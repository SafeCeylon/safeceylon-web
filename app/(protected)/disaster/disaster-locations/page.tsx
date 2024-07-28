'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import GoogleMaps from '@/components/GoogleMaps';

import Image from 'next/image';
import add_icon from '@/public/assets/add_icon.svg';

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-2">
          <div className="w-full h-20 flex-shrink-0 flex flex-row justify-between">
            <Button
              variant="outline"
              className="mt-4 ml-4 rounded-full shadow-md shadow-gray-400"
            >
              <Image
                src={add_icon}
                alt="Logo1"
                className="h-[18px] w-auto pr-2"
              />
              Add Disaster Location
            </Button>

            <Select>
              <SelectTrigger className="w-[180px] mt-4 mr-4 rounded-full shadow-md shadow-gray-400">
                <SelectValue placeholder="User Repors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">User Repors</SelectItem>
                <SelectItem value="dark">User Repors</SelectItem>
                <SelectItem value="system">User Repors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-[90%]">
            <GoogleMaps />
          </div>
        </div>
      </div>
    </div>
  );
}
