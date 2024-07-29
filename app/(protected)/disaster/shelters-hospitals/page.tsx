'use client';

import { Button } from '@/components/ui/button';


import GoogleMaps_withSearch from '@/components/GoogleMaps_withSearch';
import GMaps_search from '@/components/gMaps_search';

import Link from 'next/link';

import Image from 'next/image';
import add_icon from '@/public/assets/add_icon.svg';

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-0">
          <div className="w-full h-20 flex-shrink-0 flex flex-row items-center justify-between">

            <div>
              <Button
                variant="outline"
                className="ml-4 rounded-full shadow-md shadow-gray-400"
              >
                <Image
                  src={add_icon}
                  alt="Logo1"
                  className="h-[18px] w-auto pr-2"
                />
                <Link href="#">Add Shelters</Link>
              </Button>

              <Button
                variant="outline"
                className="ml-4 rounded-full shadow-md shadow-gray-400"
              >
                <Image
                  src={add_icon}
                  alt="Logo1"
                  className="h-[18px] w-auto pr-2"
                />
                <Link href="#">Add Hospitals</Link>
              </Button>
            </div>

          </div>

          <div className="h-[90%]">
            <GoogleMaps_withSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
