'use client';

import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';
import DefaultProfilePic from '@/public/assets/default_profile_pic.png';


export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full">
      <div className="w-full h-full flex bg-white flex-col rounded-2xl">
        
        <div className="h-[10%] pl-10 flex items-center">
          <p className="font-bold text-xl">Disaster Victims Chat</p>

        </div>

        <div className=" w-full h-[90%] pl-10 pr-10 pb-10">

          

          <div className="w-full h-full bg-slate-200 p-10 rounded-2xl flex flex-row gap-10">
            <div className="h-full w-1/4 bg-white rounded-2xl shadow-md shadow-gray-400">

              <div className="relative p-7 h-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="absolute left-10 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder="Search Name..."
                  className="pl-12 py-2 border rounded-md bg-slate-100"
                />
              </div>

              <div className="h-5/6 pl-9 flex flex-col gap-2 overflow-y-auto custom-scrollbar">

                {/* Tis is the Template for the Avatar...
                <div className="flex flex-row items-center gap-3">
                  <Avatar>
                    <AvatarImage className="scale-150" src='/assets/default_profile_pic.png'/>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>Use Name</p>
                </div> 
                */}

                {
                  // loop for 20 times
                  Array.from({ length: 20 }, (_, i) => (
                    <div className="flex flex-row items-center gap-3">
                      <Avatar>
                        <AvatarImage className="scale-150" src='/assets/default_profile_pic.png'/>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>Use Name</p>
                    </div>
                  ))
                }
                
              </div>

            </div>

            <div className="h-full w-2/4 bg-white rounded-2xl shadow-md shadow-gray-400">

                <div className="h-[12%] flex items-center pl-7">
                  <div className="flex flex-row items-center gap-3">
                      <Avatar>
                        <AvatarImage className="scale-150" src='/assets/default_profile_pic.png'/>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>Use Name</p>
                    </div>
                </div>

                <div className="bg-slate-100 h-[75%] mx-7 rounded-2xl">

                </div>

                <div className="h-[13%] mx-7 pt-5">
                  <Input
                    type="text"
                    placeholder="Write your message"
                    className="border rounded-md bg-slate-100"
                  />

                </div>
            
            </div>
            
            <div className="h-full w-1/4  bg-white rounded-2xl shadow-md shadow-gray-400">
                <div className="h-2/5 flex flex-col items-center justify-center">
                  <Image src={DefaultProfilePic} alt="Logo1" className="h-4/6 w-auto"/>
                  <p className="mt-[-10px] text-lg font-bold">Use Name</p>                  
                </div>

                <div className="h-3/5 p-5 pt-0 ">
                  <div className="bg-slate-100 h-full rounded-2xl">
                    <p className="text-center font-bold pt-5">Disaster
                    Information</p>
                  </div>

                </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
