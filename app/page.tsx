import { Poppins } from 'next/font/google';

import Image from 'next/image';

import images from '@/constants/images';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';

const font = Poppins({ subsets: ['latin'], weight: ['600'] });

export default function Home() {
  return (
    <main className="bg-[url('../public/assets/HomeBG.png')] bg-cover bg-center  h-screen overflow-hidden flex justify-start lg:justify-end bg-[#0D0D0F] text-white">
      <div className="flex flex-col lg:items-end lg:justify-center w-full lg:w-[50%] h-screen px-[50px] pt-[100px] lg:pt-0 md:px-[100px] lg:mt-[-170px]  lg:bg-transparent">
        <Image
          src={images.Logo1}
          alt="Logo1"
          className="w-auto lg:hidden-0 lg:h-[120px] xl:h-[150px] 2xl:h-[180px]"
        />
        <h3 className="text-3xl mt-5">
          Revolutionizing Disaster Management and Safety.
        </h3>
        <p className="mt-5">
          SafeCeylon is a robust and comprehensive system designed to enhance
          disaster management and safety for all.
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
