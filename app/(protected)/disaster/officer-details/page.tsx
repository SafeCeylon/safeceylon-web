'use client';

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"


import Image from 'next/image';
import Link from 'next/link';


import add_icon from '@/public/assets/add_icon.svg';
import DefaultOfficerImage from '@/public/assets/default_officer_image.png';
import Updateicon from '@/public/assets/update_icon.svg';
import DeleteIcon from '@/public/assets/delete_icon.svg';

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl p-5 pt-2">
          <div className="px-20 w-full h-[11%] flex-shrink-0 flex flex-row justify-between items-center">
            <Button
              variant="outline"
              className="rounded-full shadow-md shadow-gray-400"
            >
              <Image
                src={add_icon}
                alt="Logo1"
                className="h-[18px] w-auto pr-2"
              />
              Add Disaster Location
            </Button>

            <div className='flex items-center rounded-full shadow-md shadow-gray-400'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 absolute bg-left-top mt-6 transform -translate-y-1/2 text-gray-500 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <Input
                type="text"
                placeholder="       Search anything..."
                className="rounded-full"
              />
            </div>            
          </div>

          <div className='h-[89%] px-20 grid gap-y-10 gap-x-28 grid-cols-2 overflow-y-auto'>

            {
              Array(20).fill(0).map((_, index) => (        

                <div key={index} className='w-full h-40 flex flex-row rounded-2xl shadow-md shadow-gray-400'>

                  <Link href={'/disaster/officer-details/profile/'} className='w-[90%] flex flex-row hover:text-amber-500'>
                    <div className='h-full w-[25%] rounded-2xl rounded-r-none' style={{ backgroundColor: '#9ACC99' }}>
                      <Image 
                        className='w-full h-full object-contain object-center rounded-2xl rounded-r-none'
                        src={DefaultOfficerImage} 
                        alt='Officer Image' 
                      />
                    </div>

                    <div className='h-full w-[65%] pl-10 py-5 flex flex-col justify-center items-start gap-2'>
                      <p className='text-lg font-bold'>Officer Name</p>
                      <p className='text-lg'>Senior Officer</p>
                      <p className='text-lg'>071 2926 972</p>

                    </div>   
                  </Link>


                  <div className='h-full w-[10%] rounded-2xl rounded-l-none flex flex-col justify-between items-end py-3 pr-3'>
                    <Link href={'#'}>
                      <div className='w-full flex'>
                        <Image src={Updateicon} alt='Update Icon' className='w-7' />
                      </div>
                    </Link>

                    <Link href={'#'}>
                      <div className='w-full flex'>
                        <Image src={DeleteIcon} alt='Update Icon' className='w-7' />
                      </div>
                    </Link>
                  </div>               

                </div>
              ))
            }
          </div>


          
        </div>
      </div>
    </div>
  );
}
