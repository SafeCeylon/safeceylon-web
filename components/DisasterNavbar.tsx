import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import images from '../constants/images';
import SearchBar from './SearchBar';

interface DisasterNavbarProps {
  active: string;
}

const DisasterNavbar: React.FC<DisasterNavbarProps> =  ({ active }) => {
  return (
    <header className="px-[50px] md:px-[100px] py-[10px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Image src={images.Logo4} alt="Logo1" className="h-[30px] w-auto" />
          <div className="flex gap-5 tracking-wide">
            <Link href={'/'} className={`font-light ${active == "dashboard" ? "text-active" : "text-white"}`}>
              Dashboard
            </Link>
            <Link href={'./disasterLocations'} className={`font-light ${active == "disasterLocations" ? "text-active" : "text-white"}`}>
              Disaster Locations
            </Link>
            <Link href={'/shelters'} className={`font-light ${active == "shelters" ? "text-active" : "text-white"}`}>
              Shelters / Hospitals
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <SearchBar />
          <div className="text-white flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <Image
              src={images.DisasterProfile}
              alt="Profile"
              className="h-[40px] w-[40px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-[30px] flex gap-[200px]">
        <div className="flex flex-col gap-1">
          <h3 className="text-white font-medium text-xl tracking-wider">
            Meteorology Department,{' '}
            <span className="text-[#ff9900]">Sri Lanka</span>
          </h3>
          <h4 className="text-white font-extralight tracking-wide ">
            Dashboard
          </h4>
        </div>
        <div className="flex gap-5 tracking-wide">
          <Link href={'#'} className={`font-light ${active ? "text-active" : "text-white"}`}>
            Disaster Predictions
          </Link>
          <Link href={'#'} className={`font-light ${active ? "text-active" : "text-white"}`}>
            Disaster Victims
          </Link>
          <Link href={'#'} className={`font-light ${active ? "text-active" : "text-white"}`}>
            Officer Details
          </Link>
        </div>
      </div>
    </header>
  );
}


export default DisasterNavbar;