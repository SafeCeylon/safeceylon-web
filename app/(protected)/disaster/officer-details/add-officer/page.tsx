'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Input } from "@/components/ui/input";

import DefaultOfficerImage from '@/public/assets/default_officer_image.png';
import CustomFileUpload from '@/components/CustomFileUpload';

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
      <div className="flex flex-col w-full gap-14 h-full">
        <div className="w-full bg-white h-full rounded-2xl flex justify-center">
          <div className="h-full w-4/6 py-5">

            <div className="w-full h-[35%] flex flex-row items-start rounded-2xl">
              <div className='h-full w-fill flex flex-col items-start'>
                <p className='text-2xl pl-1 pb-2'>Profile Image</p>                
                <Image src={DefaultOfficerImage} alt="DefaultOfficerImage" className="h-full w-full object-cover rounded-2xl shadow-md shadow-gray-400" />
              </div>

              <div className='h-full w-full flex flex-col pl-10 pt-16'>
                <p className='text-2xl'>Upload new photo</p>
                <div className='w-[20%] pt-5'>
                  <CustomFileUpload/>
                </div>
              </div>
            </div>

            <div className='w-full h-[65%] pt-10'>
              <div className='w-full flex flex-col gap-5'>

                <div className='flex flex-col w-full gap-2'>
                  Officer Name
                  <div className='flex flex-row w-full gap-5'>
                    <Input type='text' placeholder='First Name' className='h-10 rounded-md shadow-md shadow-gray-400'/>
                    <Input type='text' placeholder='Last Name' className='h-10 rounded-md shadow-md shadow-gray-400'/>
                  </div>
                </div>

                <div className='flex flex-row w-full gap-5'>
                  <div className='flex flex-col w-2/5 gap-2'>
                    Employee Number
                    <Input type='text' placeholder='Employee Number: E0001' className='h-10 rounded-md shadow-md shadow-gray-400'/>
                  </div>
                  <div className='flex flex-col w-full gap-2'>
                    NIC
                    <Input type='text' placeholder='NIC Number: 199922772244' className='h-10 rounded-md shadow-md shadow-gray-400'/>
                  </div>
                </div>

                <div className='flex flex-col w-full gap-2'>
                  Email
                  <div className='flex flex-row w-full gap-5'>
                    <Input type='text' placeholder='Email: example@email.com' className='h-10 rounded-md shadow-md shadow-gray-400'/>
                  </div>
                </div>

                <div className='flex flex-col w-full gap-2'>
                  Mobile Number
                  <div className='flex flex-row w-full gap-5'>
                    <Input type='text' placeholder='Mobile Number: 0701234567' className='h-10 rounded-md shadow-md shadow-gray-400'/>
                  </div>
                </div>

                <div className='flex flex-row w-full gap-2 pt-4'>
                  <Link href={'/disaster/officer-details/'} className='w-1/5 h-10'>
                    <button className='bg-[#B3B3B3] hover:bg-[#727272] w-full h-full text-white rounded-md shadow-md shadow-gray-400'>
                      Cancel
                    </button>
                  </Link>
                  
                  <Link href={'/disaster/officer-details/'} className='w-4/5 h-10'>
                    <button className='bg-[#00A372] hover:bg-[#21785e] w-full h-full text-white rounded-md shadow-md shadow-gray-400'>
                      Add Officer
                    </button>
                  </Link>                  
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
